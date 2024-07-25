import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("UHC Claims Mock Details checking API", () => {

    it("Get Member Details for Patient", () => {
        cy.fixture<{ UhcClaimsMockEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://patients-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const UhcClaimsMockEndPoint = apiEndpoints.UhcClaimsMockEndPoint;
                const url =
                    `${apiUrl}${UhcClaimsMockEndPoint}` + 6272;
                cy.task("getAccessToken").then((token) => {
                    if (!token) {
                        throw new Error("Failed to retrieve access token");
                    }

                    const headers = AuthUtil.getHeaders(token);
                    cy.log(`API URL: ${url}`);
                    cy.log(`API Headers: ${JSON.stringify(headers)}`);
                    cy.sendRequestWithOutBody(
                        url,
                        headers,
                        apiMethods.GET
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });
});