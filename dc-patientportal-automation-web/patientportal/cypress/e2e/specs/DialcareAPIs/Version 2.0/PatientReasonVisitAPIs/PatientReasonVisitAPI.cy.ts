import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

import { faker } from "@faker-js/faker";
describe("Patient Reason visit GET APIs", () => {
  it("Positive - Patient Reason visit ID grants access.", () => {
    cy.fixture<{ GetPatientReasonForVisitsEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientReasonForVisitsEndpoint =
        apiEndpoints.GetPatientReasonForVisitsEndpoint;
      const url = `${apiUrl}${GetPatientReasonForVisitsEndpoint}` + 2068;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);

            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Patient Reason visit ID grants access.", () => {
    cy.fixture<{ GetPatientReasonForVisitsEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientReasonForVisitsEndpoint =
        apiEndpoints.GetPatientReasonForVisitsEndpoint;
      const url =
        `${apiUrl}${GetPatientReasonForVisitsEndpoint}` + 345678987654567;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Patient Reason visit ID with string", () => {
    cy.fixture<{ GetPatientReasonForVisitsEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientReasonForVisitsEndpoint =
        apiEndpoints.GetPatientReasonForVisitsEndpoint;
      const url =
        `${apiUrl}${GetPatientReasonForVisitsEndpoint}` + "invalidString";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Patient Reason visit ID with invalid data as special char", () => {
    cy.fixture<{ GetPatientReasonForVisitsEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const GetPatientReasonForVisitsEndpoint =
        apiEndpoints.GetPatientReasonForVisitsEndpoint;
      const url =
        `${apiUrl}${GetPatientReasonForVisitsEndpoint}` + "#$%^&*(#$%";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Positive - Save Reason for visit API POST", () => {
    const requestBody = {
      createdBy: "Admin",
      createdOn: "2024-04-18T06:38:07.599Z",
      updatedBy: "Admin",
      updatedOn: "2024-04-18T06:38:07.599Z",
      appointmentId: 2068,
      patientId: 49,
      reasonForVisit: "Fear " + faker.lorem.words(),
    };

    cy.fixture<{ createPatientReasonVisitEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const createPatientReasonVisitEndpoint =
        apiEndpoints.createPatientReasonVisitEndpoint;
      const url = `${apiUrl}${createPatientReasonVisitEndpoint}`;
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
});
