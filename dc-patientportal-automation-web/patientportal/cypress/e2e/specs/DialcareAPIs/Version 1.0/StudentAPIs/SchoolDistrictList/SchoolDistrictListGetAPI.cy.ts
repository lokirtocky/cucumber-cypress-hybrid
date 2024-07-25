import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Validate school district", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Validate school district list API GET Request", () => {
    cy.fixture<{ SchoolDistrictListEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const schoolDistrictListEndPoint =
        apiEndpoints.SchoolDistrictListEndPoint;
      const url = `${apiUrl}${schoolDistrictListEndPoint}`;
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
});
