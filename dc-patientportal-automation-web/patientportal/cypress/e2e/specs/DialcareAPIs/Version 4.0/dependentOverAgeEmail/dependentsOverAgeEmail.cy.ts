import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";

describe("Overage Dendpendent email...", () => {
  const userName = env.gmailUserName;
  const password = env.gmailPassword;
  const fromEmail = env.fromEmail;
  const recipientEmail = env.recipientEmail;
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
  it("Validate - Over Age Dependent for Spanish as a  API POST Request", () => {
    const requestBody = {
      fName: "Arnold",
      lName: "Sharma",
      mName: "",
      suffix: "Mr",
      addressLine1: "Test-Address",
      addressLine2: "Test-Address",
      city: "Caliornia",
      state: "Ca",
      zipCode: "89244",
      dob: "2000-05-07T17:24:30.285Z",
      preferredLanguage: "es",
      email: "dialcare01@gmail.com",
      phone: "8769855433",
      height: "",
      weight: 0,
      relationshiptoAccountholder: "D",
      isConfirmed: false,
      isLegalGuardian: false,
    };

    cy.fixture<{ OverAgeDenpdentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const OverAgeDenpdentEndPoint = apiEndpoints.OverAgeDenpdentEndPoint;
        const url = `${apiUrl}${OverAgeDenpdentEndPoint}` + "1061/dependents";
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.POST
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Fetch the Dependent overage emails for english  for a Specified User in gmail", () => {
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

  it("Validate - Over age Depdendent for English as a API POST Request", () => {
    const requestBody = {
      fName: "Arnold",
      lName: "Sharma",
      mName: "",
      suffix: "Mr",
      addressLine1: "Test-Address",
      addressLine2: "Test-Address",
      city: "Caliornia",
      state: "Ca",
      zipCode: "89244",
      dob: "2000-05-07T17:24:30.285Z",
      preferredLanguage: "en",
      email: "dialcare01@gmail.com",
      phone: "8769855433",
      height: "",
      weight: 0,
      relationshiptoAccountholder: "D",
      isConfirmed: false,
      isLegalGuardian: false,
    };

    cy.fixture<{ OverAgeDenpdentEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const OverAgeDenpdentEndPoint = apiEndpoints.OverAgeDenpdentEndPoint;
        const url = `${apiUrl}${OverAgeDenpdentEndPoint}` + "1061/dependents";
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.POST
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Fetch the Dependent overage emails from spanish as a Specified User in gmail", () => {
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
