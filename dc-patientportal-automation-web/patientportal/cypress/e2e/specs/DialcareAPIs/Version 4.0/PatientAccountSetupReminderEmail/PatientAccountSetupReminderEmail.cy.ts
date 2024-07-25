import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";
import SessionData from "cypress/support/utils/SessionUtils";
import sessionVaraiblesData from "../../../../../fixtures/sessionVariables.json";

describe("Getting Pateint Account Setup Email...", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";

  it("Pateint Account Setup Reminder emaill Post API", () => {
    const requestBody = {};

    cy.fixture<{ CancelAppointmentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const CancelAppointmentEndPoint =
          apiEndpoints.CancelAppointmentEndPoint;
        const url = `${apiUrl}${CancelAppointmentEndPoint}`;
        const headers = AuthUtil.getHeaders(
          SessionData.sessionVariableCalled(sessionVaraiblesData.ACCESS_TOKEN)
        );
        cy.log(`API URL: ${url}`);
        cy.log(
          `API Headers: ${JSON.stringify(
            AuthUtil.getHeaders(
              SessionData.sessionVariableCalled(
                sessionVaraiblesData.ACCESS_TOKEN
              )
            )
          )}`
        );
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      }
    );
    const userName = env.gmailUserName;
    const password = env.gmailPassword;
    const fromEmail = env.fromEmail;
    const recipientEmail = env.recipientEmail;
    cy.wait(8000);
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
