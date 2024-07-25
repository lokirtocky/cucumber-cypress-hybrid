import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

context('POST - Medication', () => {

    specify('Verify Medication Post Request', () => {
        const petID = 217;
        const medication = faker.person.firstName();

        cy.fixture<{ medicationEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const medicationEndPoint =
                apiEndpoints.medicationEndPoint;
            const url = `${apiUrl}${medicationEndPoint}` + "petId=" + `${petID}` + `&medicationName= ${medication} ` + `&CreatedBy=admin`;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }
                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                });
            });
        });
    });
});