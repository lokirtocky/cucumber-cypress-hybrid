import Imap from "imap";
import { simpleParser, ParsedMail } from "mailparser";
import { Readable } from "stream";
import { JSDOM } from "jsdom";
import { createLogger, format, transports, Logger } from "winston";

class EmailUtils {
  private static logger: Logger = createLogger({
    level: "info",
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()],
  });

  private imapConfig: Imap.Config;
  private imap: Imap;
  private folder?: Imap.Box;
  private messages: ParsedMail[] = [];

  constructor(private userName: string, private password: string) {
    this.imapConfig = {
      user: userName,
      password: password,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 30000,
      keepalive: true,
    };
    this.imap = new Imap(this.imapConfig);
  }

  public async createImapSessionForGmail(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once("ready", async () => {
        try {
          await this.openInbox();
          EmailUtils.logger.info("IMAP Session created and inbox opened");
          resolve();
        } catch (err) {
          EmailUtils.logger.error("Failed to open inbox:", err);
          reject(err);
        }
      });

      this.imap.once("error", (err: any) => {
        EmailUtils.logger.error("IMAP Session error:", err);
        reject(err);
      });

      this.imap.connect();
    });
  }

  private async openInbox(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.openBox("INBOX", false, (err, box) => {
        if (err) {
          EmailUtils.logger.error("Failed to open inbox:", err);
          reject(err);
        } else {
          this.folder = box;
          resolve();
        }
      });
    });
  }

  public async getLatestMessageFromTo(
    fromEmail: string,
    recipientEmail: string
  ): Promise<ParsedMail | null> {
    const searchCriteria = [
      ["FROM", fromEmail],
      ["TO", recipientEmail],
    ];
    const fetchOptions: Imap.FetchOptions = {
      bodies: "",
      markSeen: false,
    };

    return new Promise((resolve, reject) => {
      this.imap.search(searchCriteria, (err, results) => {
        if (err) {
          EmailUtils.logger.error("Search error:", err);
          reject(err);
          return;
        }
        if (results.length === 0) {
          EmailUtils.logger.info("No mails found");
          resolve(null);
          return;
        }

        const latestMessageUID = Math.max(...results);
        const fetch = this.imap.fetch(
          latestMessageUID.toString(),
          fetchOptions
        );

        fetch.on("message", (msg, seqNo) => {
          msg.on("body", (stream: Readable) => {
            simpleParser(stream, (err, mail) => {
              if (err) {
                EmailUtils.logger.error("Parsing error:", err);
                reject(err);
              } else {
                resolve(mail);
              }
            });
          });
        });

        fetch.once("end", () => {
          EmailUtils.logger.info("Done fetching the latest message");
        });

        fetch.once("error", (fetchError) => {
          EmailUtils.logger.error("Fetch error:", fetchError);
          reject(fetchError);
        });
      });
    });
  }

  public static getTextFromHtml(htmlContent: string): string | null {
    if (!htmlContent) return null;
    const dom = new JSDOM(htmlContent);
    return dom.window.document.body.textContent || null;
  }

  public static getLinkFromHtml(
    htmlContent: string,
    linkName: string,
    indexOfElement: number
  ): string | null {
    const dom = new JSDOM(htmlContent);
    const elements = Array.from(dom.window.document.querySelectorAll("a"));
    const filteredElements = elements.filter(
      (el) => el.textContent === linkName
    );
    if (filteredElements.length >= indexOfElement) {
      return filteredElements[indexOfElement - 1].getAttribute("href");
    }
    return null;
  }

  public async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.imap.state === "disconnected") {
        EmailUtils.logger.info("IMAP already disconnected");
        resolve();
      } else {
        this.imap.end();
        this.imap.once("close", () => {
          EmailUtils.logger.info("IMAP connection closed");
          resolve();
        });
      }
    });
  }
}

export default EmailUtils;
