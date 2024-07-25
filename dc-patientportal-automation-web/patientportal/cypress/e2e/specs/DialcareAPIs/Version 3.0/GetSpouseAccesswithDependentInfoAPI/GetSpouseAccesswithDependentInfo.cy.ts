import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Get Spouse Access With Dependent Info APIs", () => {
  it("Positive - Verify Get Spouse Access With Dependent Info API", () => {
    cy.fixture<{ GetSpouseAccesswithDependentInfoEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const GetSpouseAccesswithDependentInfoEndPoint =
        apiEndpoints.GetSpouseAccesswithDependentInfoEndPoint;
      const url = `${apiUrl}${GetSpouseAccesswithDependentInfoEndPoint}` + 1061;
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

  it("Negative - Verify Get Spouse Access With Dependent Info API", () => {
    cy.fixture<{ GetSpouseAccesswithDependentInfoEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const GetSpouseAccesswithDependentInfoEndPoint =
        apiEndpoints.GetSpouseAccesswithDependentInfoEndPoint;
      const url =
        `${apiUrl}${GetSpouseAccesswithDependentInfoEndPoint}` + -222838;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Verify Get Spouse Access With Dependent with String Info API", () => {
    cy.fixture<{ GetSpouseAccesswithDependentInfoEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const GetSpouseAccesswithDependentInfoEndPoint =
        apiEndpoints.GetSpouseAccesswithDependentInfoEndPoint;
      const url =
        `${apiUrl}${GetSpouseAccesswithDependentInfoEndPoint}` + "qwerty";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Verify Get Spouse Access With Dependent with Special Chracter Info API", () => {
    cy.fixture<{ GetSpouseAccesswithDependentInfoEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const GetSpouseAccesswithDependentInfoEndPoint =
        apiEndpoints.GetSpouseAccesswithDependentInfoEndPoint;
      const url =
        `${apiUrl}${GetSpouseAccesswithDependentInfoEndPoint}` + "!@#$%^&*(";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });
});
