import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Validate school name list", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Validate school name list API GET Request", () => {
    cy.fixture<{ SchoolNameListEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const schoolNameListEndPoint = apiEndpoints.SchoolNameListEndPoint;
        const url = `${apiUrl}${schoolNameListEndPoint}`;
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
});
