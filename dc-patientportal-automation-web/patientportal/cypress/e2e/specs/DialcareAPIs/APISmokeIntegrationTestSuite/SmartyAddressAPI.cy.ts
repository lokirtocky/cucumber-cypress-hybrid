import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Smarty Address Validation Tests", () => {
  it("Get auto complete address API GET", () => {
    cy.fixture<{ autoSuggestionAddressGetEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl =
        "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
      const autoSuggestionAddressGetEndpoint =
        apiEndpoints.autoSuggestionAddressGetEndpoint;
      const url = `${apiUrl}${autoSuggestionAddressGetEndpoint}`;
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
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.property("result");
            expect(response.body.result).to.be.an("array").that.is.not.empty;
            response.body.result.forEach((address: any) => {
              expect(address).to.have.all.keys(
                "id",
                "cityName",
                "defaultCityName",
                "deliveryPoint",
                "deliveryPointCheckDigit",
                "plus4Code",
                "primaryNumber",
                "state",
                "streetName",
                "streetSuffix",
                "zipCode",
                "country"
              );
              expect(address.id).to.be.a("number");
              expect(address.cityName).to.be.a("string");
              expect(address.state).to.be.a("string");
              expect(address.zipCode).to.be.a("string");
              expect(address.country).to.eq("United States");
            });

            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("suggested-address API POST", () => {
    const requestBody = {
      address1: "123 1/2 10th Ave",
      city: "South Charleston",
      state: "WV",
      zipCode: "25303",
    };

    cy.fixture<{ suggestedAddressEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const suggestedAddressEndPoint = apiEndpoints.suggestedAddressEndPoint;
        const url = `${apiUrl}${suggestedAddressEndPoint}`;
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

  it("Verify Address API POST", () => {
    const requestBody = {
      address1: "123 1/2 10th Ave",
      city: "South Charleston",
      state: "WV",
      zipCode: "25303",
    };

    cy.fixture<{ VerifyAddressEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const VerifyAddressEndPoint = apiEndpoints.VerifyAddressEndPoint;
        const url = `${apiUrl}${VerifyAddressEndPoint}`;
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
});
