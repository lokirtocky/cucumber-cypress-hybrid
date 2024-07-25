import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../fixtures/apiMethods.json";

describe("Verify Eligibility API", () => {
  const apiUrl: string = Cypress.env("apiUrl");

  it("Verify Eligibility API GET Request", () => {
    cy.fixture<{ VerfiyEligibilityEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const verfiyEligibilityEndPoint =
          apiEndpoints.VerfiyEligibilityEndPoint;
        const url = `${apiUrl}${verfiyEligibilityEndPoint}`;
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
