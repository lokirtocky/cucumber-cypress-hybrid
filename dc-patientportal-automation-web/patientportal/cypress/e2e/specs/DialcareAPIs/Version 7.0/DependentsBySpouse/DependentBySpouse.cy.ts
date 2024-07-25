import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

context('GET - Dependent By Spouse', () => {

    specify('Verify Get - Dependent By Spouse Request', () => {
        cy.fixture<{ dependentBySpouse: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const dependentBySpouse =
                apiEndpoints.dependentBySpouse;
            const url = `${apiUrl}${dependentBySpouse}` + "?spouseid=29075"
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
                });
            });
        });

    });
});