import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

context('Put - UpdatePatientPersonalInformation', () => {

    specify('Verify update Patient Personal Information', () => {
        const requestBody = {
            "fName": faker.person.firstName(),
            "lName": faker.person.lastName(),
            "mName": "s",
            "suffix": "mrs",
            "addressLine1": "Hmr",
            "addressLine2": "Hmr",
            "city": "Hmr",
            "state": "HP",
            "zipCode": "174311",
            "dob": "2000-07-23T08:25:35.996Z",
            "preferredLanguage": "en",
            "email": "Bani@mailinator.com",
            "phone": "7655487487",
            "weight": 46,
            "height": 5.7,
            "gender": "f",
            "raceEthnicity": "any",
            "relationshipCode": "A",
            "isLegalGuardian": true
        }

        cy.fixture<{ updatePatientPersonalInfoEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const updatePatientPersonalInfoEndPoint =
                apiEndpoints.updatePatientPersonalInfoEndPoint;
            const url = `${apiUrl}${updatePatientPersonalInfoEndPoint}` + "?patientId=6094";
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