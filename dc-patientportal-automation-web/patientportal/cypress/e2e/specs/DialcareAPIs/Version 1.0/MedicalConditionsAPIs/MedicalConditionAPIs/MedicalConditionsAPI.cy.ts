import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Medical Conditions APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Medical Conditions Get Request", () => {
    cy.fixture<{ MedicalConditionsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const medicalConditionsEndPoint =
          apiEndpoints.MedicalConditionsEndPoint;
        const url = `${apiUrl}${medicalConditionsEndPoint}`;
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
      }
    );
  });

  it("Medical Conditions POST Request", () => {
    const requestBody = {
      id: 0,
      medicalConditionDescription: faker.lorem.lines(),
      createdBy: "Sherrie",
      createdOn: "2024-01-16T13:23:16.535Z",
      updatedBy: "Sherrie",
      updatedOn: "2024-01-16T13:23:16.535Z",
      PatientType: "Patient",
    };

    cy.fixture<{ MedicalConditionsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const medicalConditionsEndPoint =
          apiEndpoints.MedicalConditionsEndPoint;
        const url = `${apiUrl}${medicalConditionsEndPoint}`;
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

  it("Medical Conditions PUT Request", () => {
    const requestBody = {
      id: "11",
      medicalConditionDescription: "Eye Flu",
      createdBy: "Sherrie",
      createdOn: "2024-01-16T13:23:16.535Z",
      updatedBy: "Sherrie",
      updatedOn: "2024-01-16T13:23:16.535Z",
    };

    cy.fixture<{ MedicalConditionsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const medicalConditionsEndPoint =
          apiEndpoints.MedicalConditionsEndPoint;
        const url = `${apiUrl}${medicalConditionsEndPoint}`;
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
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });
});
