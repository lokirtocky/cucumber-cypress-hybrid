import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Document List API", () => {
  const apiUrl: string =
    "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";

  it("Document List API POST Request", () => {
    const requestBody = {
      type: "patient",
      typeid: 352,
    };

    cy.fixture<{ DocumentListEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const documentListEndPoint = apiEndpoints.DocumentListEndPoint;
        const url = `${apiUrl}${documentListEndPoint}`;
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

  it.skip("Document Id API POST Request", () => {
    // page not found 404
    const requestBody = {
      documentID: 0,
      type: "Admin",
    };

    cy.fixture<{ DocumentIdByListPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const DocumentIdByListPostEndPoint =
        apiEndpoints.DocumentIdByListPostEndPoint;
      const url = `${apiUrl}${DocumentIdByListPostEndPoint}`;
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

  it.skip("Document Id API DELETE Request", () => {
    // page not found 404
    cy.fixture<{ DocumentIdByListPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const DocumentIdByListPostEndPoint =
        apiEndpoints.DocumentIdByListPostEndPoint;
      const url = `${apiUrl}${DocumentIdByListPostEndPoint}`;
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
