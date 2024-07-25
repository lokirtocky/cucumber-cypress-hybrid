import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Family Medical History APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Family Medical History Search API POST Request", () => {
    const requestBody = {
      patientId: 0,
      medicalHistoryType: "T.B",
      relationshipType: "Sister",
      statusCode: "A",
    };

    cy.fixture<{ familyMedicalHistoryPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const familyMedicalHistoryPostEndPoint =
        apiEndpoints.familyMedicalHistoryPostEndPoint;
      const url = `${apiUrl}${familyMedicalHistoryPostEndPoint}`;
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

  it("Family Medical History API GET Request", () => {
    cy.fixture<{ familyMedicalHistoryGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const familyMedicalHistoryGetEndPoint =
        apiEndpoints.familyMedicalHistoryGetEndPoint;
      const url = `${apiUrl}${familyMedicalHistoryGetEndPoint}`;
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

  it("Family Medical History API DELETE Request", () => {
    cy.fixture<{ familyMedicalHistoryDeleteEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const familyMedicalHistoryDeleteEndPoint =
        apiEndpoints.familyMedicalHistoryDeleteEndPoint;
      const url = `${apiUrl}${familyMedicalHistoryDeleteEndPoint}`;
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
