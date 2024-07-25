import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("ON_DEMAND_TEXT API Request", () => {
  it("ON_DEMAND_TEXT API GET", () => {
    cy.fixture<{ onDemandTextEndpoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
        const onDemandTextEndpoint = apiEndpoints.onDemandTextEndpoint;
        const url = `${apiUrl}${onDemandTextEndpoint}`;
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
              expect(response.body).to.have.all.keys("result", "errors");
              expect(response.body.result)
                .to.be.an("array")
                .and.to.have.lengthOf.at.least(1);
              const resultItem = response.body.result[0];
              expect(resultItem).to.include.keys(
                "id",
                "productId",
                "instanceId",
                "consentText",
                "language",
                "isActive",
                "version",
                "consentTypeId"
              );
              expect(resultItem.id).to.be.a("number");
              expect(resultItem.productId).to.be.a("number");
              expect(resultItem.instanceId).to.be.a("number");
              expect(resultItem.consentText).to.be.a("string");
              expect(resultItem.language).to.eq("EN");
              expect(resultItem.isActive).to.be.true;
              expect(resultItem.version).to.be.a("string");
              expect(resultItem.consentTypeId).to.be.a("number");
              expect(resultItem.productType).to.be.null;
              expect(resultItem.consentType).to.be.null;
              expect(response.body.errors).to.be.null;
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });
});
