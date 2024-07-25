import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import SecretName from "../../../../../fixtures/secretName.json";

function calculateDOBForEighteenYearsOldYesterday(): string {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  eighteenYearsAgo.setDate(eighteenYearsAgo.getDate() + 8);
  return eighteenYearsAgo.toISOString().slice(0, 10);
}

const dobForEighteenYearsOldoneWeek =
  calculateDOBForEighteenYearsOldYesterday();

describe("Reminder Patient Account Update Post", () => {
  const apiUrl: string =
    'https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com';
  const userName = env.gmailUserName;
  const password = env.gmailPassword;
  const fromEmail = env.fromEmail;
  const recipientEmail = env.recipientEmail;

  it("Update data in Member Database", () => {
    cy.task("runQuery", {
      secretName: SecretName.MemberDatabase,
      query: `UPDATE Patients SET EmailAddress='dialcare01@gmail.com', DOB = '${dobForEighteenYearsOldoneWeek}' WHERE Id=317`,
    }).then((result: any) => {
      cy.task("log", "Patients Database Connected...");
      cy.task(
        "log",
        `UPDATE Patients SET EmailAddress='dialcare01@gmail.com', DOB = '${dobForEighteenYearsOldoneWeek}' WHERE Id=317`
      );
      cy.task("log", result);
      cy.task("log", "Latest Record...");
    });
  });

  it("Validate - Reminder Patient Account Update Email in English", () => {
    cy.fixture<{ ReminderPatientAccountUpdateEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ReminderPatientAccountUpdateEndPoint =
        apiEndpoints.ReminderPatientAccountUpdateEndPoint;
      const url = `${apiUrl}${ReminderPatientAccountUpdateEndPoint}`;
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
          "|               Email Retrieved In English              |"
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
