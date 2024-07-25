import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import SecretName from "../../../../../fixtures/secretName.json";

describe("Invite Third person Email Details from Gmail...", () => {
  function getFormattedDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  it("Reminder Patient Account Email API", () => {
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query:
        DatabaseQuery.UpdatePatientSetupStatusForRegistrationReminderDate +
        `'${getFormattedDate()}'` +
        " WHERE id IN (1, 2, 7, 8, 9)",
    }).then((result: any) => {
      cy.task("log", "Consultations Database Updated...");
      cy.task("log", result);
    });
    cy.fixture<{ PatientAccountSetupEmailEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const PatientAccountSetupEmailEndPoint =
        apiEndpoints.PatientAccountSetupEmailEndPoint;
      const url = `${apiUrl}${PatientAccountSetupEmailEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Fetch the emails from a Specified User from gmail", () => {
    const userName = env.gmailUserName;
    const password = env.gmailPassword;
    const fromEmail = env.fromEmail;
    const recipientEmail = env.recipientEmail;
    cy.wait(15000);
    cy.task("getEmails", {
      userName,
      password,
      fromEmail,
      recipientEmail,
    }).then((email: any) => {
      if (email) {
        cy.task(
          "log",
          "========================================================="
        );
        cy.task(
          "log",
          "|                    Email Retrieved                    |"
        );
        cy.task(
          "log",
          "========================================================="
        );
        cy.task(
          "log",
          `| Subject: ${email.subject}                              `
        );
        cy.task(
          "log",
          "========================================================="
        );
        cy.task(
          "log",
          "| Message Body:                                          "
        );
        cy.task("log", `${email.text.split("\n").join("\n| ")}`);
        cy.task(
          "log",
          "========================================================="
        );
        expect(email).to.not.be.null;
      }
    });
  });
});
