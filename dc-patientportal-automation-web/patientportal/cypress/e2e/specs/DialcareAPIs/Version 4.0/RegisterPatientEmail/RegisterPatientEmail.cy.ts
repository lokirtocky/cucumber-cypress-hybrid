import { faker } from "@faker-js/faker";
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import env from "../../../../../support/env/Stage.json";

describe("Getting the Email Details for register a patient for Gmail...", () => {
  const userName = env.gmailUserName;
  const password = env.gmailPassword;
  const fromEmail = env.fromEmail;
  const recipientEmail = env.recipientEmail;
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
  it("Patient Registration email check in english API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: "Kumar",
      middleInitial: "",
      personalSuffix: "DMD",
      dob: `${faker.date.past(18).getFullYear()}-${String(
        faker.date.past().getMonth() + 1
      ).padStart(2, "0")}-${String(faker.date.past().getDate()).padStart(
        2,
        "0"
      )}`,
      preferredLanguage: "en",
      address1: faker.location.streetAddress(),
      address2: null,
      city: faker.location.city(),
      stateCode: "AZ",
      zip: "12345",
      emailAddress: "dialcare01@gmail.com",
      primaryContactNumber: "8929892772",
      userName: faker.internet.userName(),
      password: "Test@12345",
      isAcceptedTermsAndConditions: true,
      PatientId: "32566007",
    };

    cy.fixture<{ PatientRegistrationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const patientRegistrationEndPoint =
        apiEndpoints.PatientRegistrationEndPoint;
      const url = `${apiUrl}${patientRegistrationEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Fetch the Patient english emails from a Specified  User from gmail", () => {
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

  it("Patient Registration API POST Request Spanish", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      lastName: "Kumar",
      middleInitial: "",
      personalSuffix: "DMD",
      dob: `${faker.date.past(18).getFullYear()}-${String(
        faker.date.past().getMonth() + 1
      ).padStart(2, "0")}-${String(faker.date.past().getDate()).padStart(
        2,
        "0"
      )}`,
      preferredLanguage: "es",
      address1: faker.location.streetAddress(),
      address2: null,
      city: faker.location.city(),
      stateCode: "AZ",
      zip: "12345",
      emailAddress: "dialcare01@gmail.com",
      primaryContactNumber: "8929892772",
      userName: faker.internet.userName(),
      password: "Test@12345",
      isAcceptedTermsAndConditions: true,
      PatientId: "32566007",
    };

    cy.fixture<{ PatientRegistrationEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const patientRegistrationEndPoint =
        apiEndpoints.PatientRegistrationEndPoint;
      const url = `${apiUrl}${patientRegistrationEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Fetch the Patient Register spanish emails from a Specified User from gmail", () => {
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
