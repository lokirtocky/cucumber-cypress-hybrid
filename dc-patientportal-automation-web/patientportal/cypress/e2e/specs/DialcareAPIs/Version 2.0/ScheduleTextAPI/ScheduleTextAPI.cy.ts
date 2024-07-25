import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("SCHEDULE_TEXT API Request", () => {
  it("SCHEDULE_TEXT API GET", () => {
    cy.fixture<{ scheduleTextEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://config-api." + Cypress.env("env") + ".dctelemedplatform.com";
        const scheduleTextEndPoint = apiEndpoints.scheduleTextEndPoint;
        const url = `${apiUrl}${scheduleTextEndPoint}`;
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
              expect(resultItem.productId).to.equal(2);
              expect(resultItem.instanceId).to.equal(20);
              expect(resultItem.consentText).to.contain(
                "SCHEDULE TEXT Lorem ipsum dolor sit amet"
              );
              expect(resultItem.language).to.eq("EN");
              expect(resultItem.isActive).to.be.true;
              expect(resultItem.version).to.eq("Advanced");
              expect(resultItem.consentTypeId).to.equal(7);
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
