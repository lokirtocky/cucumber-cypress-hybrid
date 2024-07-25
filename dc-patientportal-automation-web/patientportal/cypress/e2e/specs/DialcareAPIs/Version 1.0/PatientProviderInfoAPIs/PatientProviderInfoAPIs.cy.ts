import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Patient Provider info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Patient Provider info POST Request", () => {
    const requestBody = {
      id: 0,
      createdBy: "sandhya",
      createdOn: "2024-01-17T16:34:36.417Z",
      updatedBy: "sandhya",
      updatedOn: "2024-01-17T16:34:36.417Z",
      patientId: 135,
      providerId: 131,
      isPreferred: true,
      productId: 0,
      ProductCode: "UC",
    };

    cy.fixture<{ SavePatientProvidersInfoPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const savePatientProvidersInfoPostEndPoint =
        apiEndpoints.SavePatientProvidersInfoPostEndPoint;
      const url = `${apiUrl}${savePatientProvidersInfoPostEndPoint}`;
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

  it("Preferred pharmacy API GET Request", () => {
    cy.fixture<{ PatientFavoriteProvidersInfoGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const patientFavoriteProvidersInfoGetEndPoint =
        apiEndpoints.PatientFavoriteProvidersInfoGetEndPoint;
      const url = `${apiUrl}${patientFavoriteProvidersInfoGetEndPoint}`;
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

  it("Patient Provider info DELETE Request", () => {
    cy.fixture<{ RemovePatientProvidersDeleteEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const removePatientProvidersDeleteEndPoint =
        apiEndpoints.RemovePatientProvidersDeleteEndPoint;
      const url = `${apiUrl}${removePatientProvidersDeleteEndPoint}`;
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
    });
  });
});
