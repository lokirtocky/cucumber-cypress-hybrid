import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../../../fixtures/apiMethods.json";

describe("Accept Term And Condition API", () => {
  const apiConfigUrl: string =
    "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";

  it("Accept Term And Condition API GET Request", () => {
    cy.fixture<{ AcceptTermAndConditionsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const acceptTermAndConditionsEndPoint =
        apiEndpoints.AcceptTermAndConditionsEndPoint;
      const url = `${apiConfigUrl}${acceptTermAndConditionsEndPoint}`;
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
