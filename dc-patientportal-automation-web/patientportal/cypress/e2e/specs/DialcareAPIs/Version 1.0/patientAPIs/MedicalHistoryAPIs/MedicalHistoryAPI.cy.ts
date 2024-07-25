import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Medical History APIs info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  it("Medical History API GET Request", () => {
    cy.fixture<{ MedicalHistoryGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const MedicalHistoryGetEndPoint =
          apiEndpoints.MedicalHistoryGetEndPoint;
        const url = `${apiUrl}${MedicalHistoryGetEndPoint}`;
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

  it("Medical History API DELETE Request", () => {
    cy.fixture<{ deleteMedicalHistoryEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const deleteMedicalHistoryEndpoint =
        apiEndpoints.deleteMedicalHistoryEndpoint;
      const url = `${apiUrl}${deleteMedicalHistoryEndpoint}`;
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

  it("Medical History Search API POST Request", () => {
    const requestBody = {
      id: 1835,
      createdOn: "2024-01-19T08:46:25.799Z",
      createdBy: "Admin",
      updatedOn: "2024-01-19T08:46:25.799Z",
      updatedBy: "Admin",
      patientId: 0,
      entityType: "Surgery1",
      key: "brother",
      value: "well",
      networkId: 0,
      status: "st",
    };
    cy.fixture<{ MedicalHistorySearchEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicalHistorySearchEndpoint =
        apiEndpoints.MedicalHistorySearchEndpoint;
      const url = `${apiUrl}${MedicalHistorySearchEndpoint}`;
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

  it("Medical History create API POST Request", () => {
    const requestBody = {
      id: 0,
      createdOn: "2024-01-19T08:21:16.525Z",
      createdBy: "system",
      updatedOn: "2024-01-19T08:21:16.525Z",
      updatedBy: "system",
      patientId: 133,
      entityType: "Surgery1",
      key: "brother",
      value: "well",
      networkId: 0,
      status: "A",
    };

    cy.fixture<{ MedicalHistoryCreateAndUpdateEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicalHistoryCreateAndUpdateEndpoint =
        apiEndpoints.MedicalHistoryCreateAndUpdateEndpoint;
      const url = `${apiUrl}${MedicalHistoryCreateAndUpdateEndpoint}`;
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

  it("Medical History Update API PUT Request", () => {
    const requestBody = {
      id: 12,
      createdOn: "2024-01-19T08:40:10.162Z",
      createdBy: "System",
      updatedOn: "2024-01-19T08:40:10.162Z",
      updatedBy: "System",
      patientId: 133,
      entityType: "Surgery1",
      key: "brother",
      value: "good",
      networkId: 0,
      status: "A",
    };

    cy.fixture<{ MedicalHistoryCreateAndUpdateEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const MedicalHistoryCreateAndUpdateEndpoint =
        apiEndpoints.MedicalHistoryCreateAndUpdateEndpoint;
      const url = `${apiUrl}${MedicalHistoryCreateAndUpdateEndpoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.PUT).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });
});
