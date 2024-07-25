import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import SecretName from "../../../../../fixtures/secretName.json";

describe("Getting the Email Details for Registration Appointment from Gmail...", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
  const userName = env.gmailUserName;
  const password = env.gmailPassword;
  const fromEmail = env.fromEmail;
  const recipientEmail = env.recipientEmail;

  it("Complete your Registration API POST Request", () => {
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query: DatabaseQuery.UpdatePatientSetupStatus,
    }).then((result: any) => {
      cy.task("log", result);
      cy.task("log", "Record Updated...");
    });
    cy.fixture<{ SentMailForCompleteRegistrationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const SentMailForCompleteRegistrationEndPoint =
        apiEndpoints.SentMailForCompleteRegistrationEndPoint;
      const url = `${apiUrl}${SentMailForCompleteRegistrationEndPoint}`;
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
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
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
          "|             Email Retrieved for English               |"
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
      } else {
        cy.task("log", "No email was found.");
        expect(email).to.be.null;
      }
    });
  });
});
