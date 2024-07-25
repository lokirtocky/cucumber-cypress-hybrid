import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

context('POST - Reset Password Email', () => {

    specify('Verify Reset Password Email post Request', () => {
        const patientID = 352;

        cy.fixture<{ resetEmailPasswordEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const resetEmailPasswordEndPoint =
                apiEndpoints.resetEmailPasswordEndPoint;
            const url = `${apiUrl}${resetEmailPasswordEndPoint}` + `${patientID}`;
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
                    apiMethods.POST
                ).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(`API Response: ${JSON.stringify(response.body)}`);
                });
            });
        });
    });
});