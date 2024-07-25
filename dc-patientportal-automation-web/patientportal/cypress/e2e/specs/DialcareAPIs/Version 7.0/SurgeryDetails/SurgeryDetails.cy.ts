import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

context('PUT - Surgery Details', () => {

    specify('Verify user able to add Surgery Details', () => {
        const patientID = 352;
        const requestBody = {
            "surgeryDescription": "Test",
            "surgeryDate": "2024-07-18T09:42:27.827Z",
            "id": 352
        }
        cy.fixture<{ surgeryDetailsEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const surgeryDetailsEndPoint =
                apiEndpoints.surgeryDetailsEndPoint;
            const url = `${apiUrl}${surgeryDetailsEndPoint}` + `${patientID}` + '/surgery-details';
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
                    apiMethods.PUT
                ).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.result).not.eq(requestBody.id);
                    cy.log(`API Response: ${JSON.stringify(response.body)}`);
                });
            });
         }
        );
    });
});