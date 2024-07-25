import AuthUtil from "cypress/support/utils/AuthUtils";

context('PreRegistrationSSOUser', () => {
    specify('Verify PreRegistrationSSOUser', () => {
        const requestBody = {
            "userName": "lifeb1",
            "groupCode": "TM4LIFEB",
            "firstName": "UNDERAGE PRIMARY FOR LIFE B",
            "lastName": "LIFE B",
            "dob": "1980-07-19T06:42:34.180Z",
            "zipCode": "33331"
          }

        cy.fixture<{ DependentRegistrationEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const DependentRegistrationEndPoint =
                apiEndpoints.DependentRegistrationEndPoint;
            const url = `${apiUrl}${DependentRegistrationEndPoint}` + 6094;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }
                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
            });
        });
    });
});