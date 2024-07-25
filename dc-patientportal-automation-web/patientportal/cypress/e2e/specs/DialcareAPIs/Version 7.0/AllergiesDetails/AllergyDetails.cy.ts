import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

context('PUT - Allergies', () => {

    const requestBody = {

        "id": 609,
        "allergiesName": "Rhinitis",
        "createdBy": "string",
        "createdOn": "2024-07-22T11:22:00.424Z",
        "updatedBy": "string",
        "updatedOn": "2024-07-22T11:22:00.424Z"
    }

    specify('Verify Allergies Post request', () => {
        const patientID = 352;

        cy.fixture<{ allergyDetails: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const allergyDetails =
                apiEndpoints.allergyDetails;
            const url = `${apiUrl}${allergyDetails}` + `${patientID}` + "/allergies-details";
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }
                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.PUT).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    });
            });
        });
    });
});