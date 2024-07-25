import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

context('PUT - Dependent Registration', () => {


    specify('Verify Primary patient able to Register the dependent', () => {

        const requestBody =
        {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "middleInitial": "",
            "personalSuffix": "",
            "dob": "2020-08-31",
            "preferredLanguage": "EN",
            "address1": "qwerty",
            "address2": "",
            "city": "california",
            "stateCode": "CA",
            "zip": "12345",
            "emailAddress": "dependentstage@mailinator.com",
            "primaryContactNumber": "1234567890",
            "userName": faker.person.firstName().replace('-', 'M') + faker.datatype.number({ min: 1000 }).toString(),
            "password": "Test@1234",
            "adB2C_ObjectID": "2014debe-d2c8-4677-a463-b60d1e7089b2",
            "isAcceptedTermsAndConditions": true
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
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.PUT).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.result.firstName).to.eq(requestBody.firstName);
                        expect(response.body.result.lastName).to.eq(requestBody.lastName);
                        expect(response.body.result.primaryContactNumber).to.eq(requestBody.primaryContactNumber);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    });
            });
        });
    });
});