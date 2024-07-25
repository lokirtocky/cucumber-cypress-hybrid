import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import SecretName from "../../../../../fixtures/secretName.json";

describe("Reminder Dependent account Setup Email in English", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
  const userName = env.gmailUserName;
  const password = env.gmailPassword;
  const fromEmail = env.fromEmail;
  const recipientEmail = env.recipientEmail;

  function calculateDOBFEighteen(): string {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    eighteenYearsAgo.setHours(12, 0, 0, 0);
    eighteenYearsAgo.setDate(eighteenYearsAgo.getDate());
    return eighteenYearsAgo.toISOString().slice(0, 10);
  }

  const dobEighteen = calculateDOBFEighteen();

  it("Validate - Reminder Dependent Account setup Request email in English", () => {
    cy.task("log", dobEighteen);
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query:
        DatabaseQuery.UpdatePatientsByPreferredLanguageEn +
        `'${dobEighteen}'` +
        " WHERE Id = 317",
    }).then((result: any) => {
      cy.task("log", "Record Updated...");
      cy.task("log", result);
    });
    cy.fixture<{ ReminderDependentAccountSetupEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ReminderDependentAccountSetupEndPoint =
        apiEndpoints.ReminderDependentAccountSetupEndPoint;
      const url = `${apiUrl}${ReminderDependentAccountSetupEndPoint}`;
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
      } else {
        cy.task("log", "No email was found.");
        expect(email).to.be.null;
      }
    });
  });

  it("Validate - Reminder Dependent Account setup Request email in Spanish", () => {
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query:
        DatabaseQuery.UpdatePatientsByPreferredLanguageEs +
        `'${dobEighteen}'` +
        " WHERE Id = 317",
    }).then((result: any) => {
      cy.task("log", result);
      cy.task("log", "Latest Record...");
    });
    cy.fixture<{ ReminderDependentAccountSetupEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ReminderDependentAccountSetupEndPoint =
        apiEndpoints.ReminderDependentAccountSetupEndPoint;
      const url = `${apiUrl}${ReminderDependentAccountSetupEndPoint}`;
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
      } else {
        cy.task("log", "No email was found.");
        expect(email).to.be.null;
      }
    });
  });
});
