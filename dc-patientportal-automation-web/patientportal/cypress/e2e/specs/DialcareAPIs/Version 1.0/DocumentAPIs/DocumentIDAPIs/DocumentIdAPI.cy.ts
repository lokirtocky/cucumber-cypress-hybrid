import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("documentId APIs", () => {
  const apiUrl: string =
    "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
  it.skip("document Id API POST Request", () => {
    // page not found 404
    const requestBody = {
      documentID: "340",
      type: "Patient",
    };

    cy.fixture<{ DocumentIdPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const documentIdPostEndPoint = apiEndpoints.DocumentIdPostEndPoint;
        const url = `${apiUrl}${documentIdPostEndPoint}`;
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

  it.skip("Document id delete API Request", () => {
    // page not found 404
    cy.fixture<{ DocumentIdDeleteEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const documentIdDeleteEndPoint = apiEndpoints.DocumentIdDeleteEndPoint;
        const url = `${apiUrl}${documentIdDeleteEndPoint}`;
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

  it.skip("Document patient API POST Request", () => {
    // page not found 404
    const requestBody = {
      documentID: "340",
      type: "Patient",
    };

    cy.fixture<{ createAnduploadDocumentPostAndPutEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const createAnduploadDocumentPostAndPutEndPoint =
        apiEndpoints.createAnduploadDocumentPostAndPutEndPoint;
      const url = `${apiUrl}${createAnduploadDocumentPostAndPutEndPoint}`;
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

  it.skip("Document patient API PUT Request", () => {
    // page not found 404
    cy.fixture<{ createAnduploadDocumentPostAndPutEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const createAnduploadDocumentPostAndPutEndPoint =
        apiEndpoints.createAnduploadDocumentPostAndPutEndPoint;
      const url = `${apiUrl}${createAnduploadDocumentPostAndPutEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.PUT).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it.skip("Archive Or Unarchive API POST Request", () => {
    // page not found 404
    const requestBody = {
      type: "patient",
      documentId: 0,
      statusType: "Admin",
      updatedOn: "2024-04-02T09:19:26.981Z",
      updatedBy: "Admin",
    };

    cy.fixture<{ ArchiveOrUnarchivePostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const ArchiveOrUnarchivePostEndPoint =
        apiEndpoints.ArchiveOrUnarchivePostEndPoint;
      const url = `${apiUrl}${ArchiveOrUnarchivePostEndPoint}`;
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
