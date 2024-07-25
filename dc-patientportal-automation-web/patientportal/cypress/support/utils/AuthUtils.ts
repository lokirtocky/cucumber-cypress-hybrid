import SessionData from "./SessionUtils";
import sessionVaraiblesData from "../../fixtures/sessionVariables.json";
import CommonPage from "cypress/e2e/pages/Common/CommonPage";

const commonPage = new CommonPage();

class AuthUtil {
  static getAccessToken(): void {
    const patients =
      "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
    const provider =
      "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
    const config =
      "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
    const consultation =
      "https://consultation-api." +
      Cypress.env("env") +
      ".dctelemedplatform.com";
    cy.task(
      "log",
      "================================================================================"
    );
    cy.task(
      "log",
      "||                                                                            ||"
    );
    cy.task(
      "log",
      "||                               API URL Details                              ||"
    );
    cy.task(
      "log",
      "||                                                                            ||"
    );
    cy.task(
      "log",
      "================================================================================"
    );
    cy.task("log", patients);
    cy.task("log", provider);
    cy.task("log", config);
    cy.task("log", consultation);
    cy.task("getAccessToken").then((token) => {
      if (token) {
        cy.task("log", "Using saved access token.");
        cy.task(
          "log",
          "================================================================================"
        );
        cy.task(
          "log",
          "||                                                                            ||"
        );
        cy.task(
          "log",
          "||                            Access Token Details                            ||"
        );
        cy.task(
          "log",
          "||                                                                            ||"
        );
        cy.task(
          "log",
          "================================================================================"
        );
        cy.task(
          "log",
          `||  Access Token: ${token}                                                      `
        );
        cy.task(
          "log",
          "================================================================================"
        );
        cy.task(
          "log",
          "|| Note: The access token is valid for 1 hour.                                ||"
        );
        cy.task(
          "log",
          "================================================================================"
        );
      } else {
        cy.task(
          "log",
          "No valid token found, logging in to generate a new one."
        );
        this.loginAndStoreToken();
        return cy.task("getAccessToken");
      }
    });
  }

  static loginAndStoreToken(): void {
    cy.log("Visiting URL...");
    cy.viewport(1920, 1080);
    cy.visit(Cypress.env("url"));
    cy.log("Setting up intercepts...");
    cy.intercept("POST", "**/oauth2/v2.0/token").as("tokenRequest");
    cy.task("log", "Entering credentials...");
    cy.origin(Cypress.env("redirectUrl"), () => {
      cy.get("input#signInName").type(Cypress.env("email"));
      cy.get("input#password").type(Cypress.env("password"));
      cy.get("button#next").click();
    });

    const logoutLnk = "div.ion-float-right ion-label:nth-child(2)";
    cy.waitForTextToAppear(logoutLnk, "LOG OUT");
    commonPage.logoutApplication();
    cy.task("log", "Waiting for login request...");
    cy.wait("@tokenRequest").then((interception) => {
      cy.task("log", "Login request captured...");
      if (
        interception.response?.body &&
        interception.response.body.access_token
      ) {
        cy.task("saveAccessToken", {
          token: interception.response.body.access_token,
          expiryTime: interception.response.body.expires_in,
        });
        cy.task("log", "New access token stored.");
      } else {
        throw new Error("Access token not found or login failed");
      }
    });
  }

  static getAccessTokenWithNewUsername(
    username: string,
    password: string
  ): void {
    const logoutLnk = "div.ion-float-right ion-label:nth-child(2)";
    cy.visit(Cypress.env("url"));
    cy.intercept("POST", "**/oauth2/v2.0/token").as("loginRequest");
    cy.origin(
      Cypress.env("redirectUrl"),
      { args: { username, password } },
      ({ username, password }) => {
        cy.get("input#signInName").type(username);
        cy.get("input#password").type(password);
        cy.get("button#next").click();
      }
    );

    cy.waitForTextToAppear(logoutLnk, "LOG OUT");
    cy.wait("@loginRequest").then((interception) => {
      if (interception.response?.body) {
        const responseBody = interception.response.body as {
          access_token: string;
        };
        if (responseBody.access_token) {
          SessionData.setSessionVariable(
            sessionVaraiblesData.NEW_USER_ACCESS_TOKEN
          ).to(responseBody.access_token);
          const accessToken = SessionData.formatTxtWithSessionVariable(
            "{NEW-USER-ACCESS-TOKEN}"
          );
          cy.log(`Access Token is : ${accessToken}`);
        } else {
          throw new Error("Access token not found");
        }
      } else {
        throw new Error("Login failed");
      }
    });
  }

  static getAdminAccessTokenWithNewUsername(
    username: string,
    password: string
  ): void {
    const logoutLnk =
      "#content > app-header > nav > ul > li > a.cursor.d-lg-inline.text-gray-600.small";
    cy.visit("https://admin.stage.dctelemedplatform.com/login");
    cy.intercept("POST", "**/oauth2/v2.0/token").as("loginRequest");
    cy.origin(
      Cypress.env("redirectUrl"),
      { args: { username, password } },
      ({ username, password }) => {
        cy.get("input#signInName").type(username);
        cy.get("input#password").type(password);
        cy.get("button#next").click();
      }
    );

    cy.waitForTextToAppear(logoutLnk, "Logout");
    cy.wait("@loginRequest").then((interception) => {
      if (interception.response?.body) {
        const responseBody = interception.response.body as {
          access_token: string;
        };
        if (responseBody.access_token) {
          SessionData.setSessionVariable(
            sessionVaraiblesData.ADMIN_USER_ACCESS_TOKEN
          ).to(responseBody.access_token);
          const accessToken = SessionData.formatTxtWithSessionVariable(
            "{ADMIN-USER-ACCESS-TOKEN}"
          );
          cy.log(`Access Token is : ${accessToken}`);
        } else {
          throw new Error("Access token not found");
        }
      } else {
        throw new Error("Login failed");
      }
    });
  }

  static getHeaders(access_token: any): { [key: string]: string } {
    const requestHeaders = {
      "X-API-KEY": "developer",
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${access_token}`,
    };
    return requestHeaders;
  }

  static getHeadersWithoutToken(): { [key: string]: string } {
    const requestHeaders = {
      accept: "text/plain",
      "Content-Type": "application/json",
      "X-API-KEY": "developer",
    };
    return requestHeaders;
  }

  static getHeadersWithFromData(access_token: any): { [key: string]: string } {
    const requestHeaders = {
      "X-API-KEY": "developer",
      "Content-Type": "multipart/form-data",
      Accept: "text/plain",
      Authorization: `Bearer ${access_token}`,
    };
    return requestHeaders;
  }
}

export default AuthUtil;
