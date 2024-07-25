import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Soap Notes APIs Validation Tests", () => {
  it("Soap notes apis API GET", () => {
    cy.fixture<{ getsoapNotesEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const getsoapNotesEndPoint = apiEndpoints.getsoapNotesEndPoint;
        const url = `${apiUrl}${getsoapNotesEndPoint}` + 23;
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

  it("soap notes API POST", () => {
    const requestBody = [
      {
        id: 0,
        createdBy: "system",
        createdOn: "2024-04-15T06:22:05.479Z",
        updatedBy: "system",
        updatedOn: "2024-04-15T06:22:05.479Z",
        consultationId: 23,
        entityType: "Subjective",
        description: "Test Subjective Notes",
      },
    ];

    cy.fixture<{ createAndUpdateSoapNotesEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const createAndUpdateSoapNotesEndpoint =
        apiEndpoints.createAndUpdateSoapNotesEndpoint;
      const url = `${apiUrl}${createAndUpdateSoapNotesEndpoint}`;
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
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("soap notes api API PUT", () => {
    //there is the issue related to DB getting 200 also
    const requestBody = [
      {
        id: 7,
        createdBy: "system",
        createdOn: "2024-04-15T06:22:05.479Z",
        updatedBy: "system",
        updatedOn: "2024-04-15T06:22:05.479Z",
        consultationId: 23,
        entityType: "Plan",
        description: "Test Plan Notes",
      },
    ];

    cy.fixture<{ createAndUpdateSoapNotesEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const createAndUpdateSoapNotesEndpoint =
        apiEndpoints.createAndUpdateSoapNotesEndpoint;
      const url = `${apiUrl}${createAndUpdateSoapNotesEndpoint}`;
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

  it("Update Notes By ConsultId And Entity Type API PUT", () => {
    const requestBody = [
      {
        id: 7,
        createdBy: "system",
        createdOn: "2024-04-15T06:22:05.479Z",
        updatedBy: "system",
        updatedOn: "2024-04-15T06:22:05.479Z",
        consultationId: 23,
        entityType: "Objective",
        description: "Test Objective Notes",
      },
    ];

    cy.fixture<{ UpdateNotesByConsultIdAndEntityTypeEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const UpdateNotesByConsultIdAndEntityTypeEndPoint =
        apiEndpoints.UpdateNotesByConsultIdAndEntityTypeEndPoint;
      const url = `${apiUrl}${UpdateNotesByConsultIdAndEntityTypeEndPoint}`;
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
