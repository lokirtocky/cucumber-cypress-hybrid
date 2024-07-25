import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Surgery details APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Surgery details API POST Request", () => {
    const requestBody = {
      surgeryDescription: "Surgery Test",
      patientType: "Patient",
      surgeryDate: "2024-05-31T06:45:03.375Z",
    };

    cy.fixture<{ SurgeryPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const SurgeryPostEndPoint =
          apiEndpoints.SurgeryPostEndPoint + 12 + "/surgery-details";
        const url = `${apiUrl}${SurgeryPostEndPoint}`;
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

  it("Surgery details GET Request", () => {
    cy.fixture<{ SurgeryGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const SurgeryGetEndPoint = apiEndpoints.SurgeryGetEndPoint;
        const url = `${apiUrl}${SurgeryGetEndPoint}`;
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

  it("Surgery details Delete Request", () => {
    cy.fixture<{ SurgeryPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const SurgeryPostEndPoint = apiEndpoints.SurgeryPostEndPoint + 12;
        const url = `${apiUrl}${SurgeryPostEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.DELETE).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });
});
