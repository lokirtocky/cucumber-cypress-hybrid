import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

context('PUT - Patient General Details', () => {

    specify('Verify Patient General Details', () => {
        const patientID = 352;

        const requestBody = {
            "height": 5,
            "weight": 0,
            "raceEthnicity": "O",
            "gender": "M",
            "preferredPharmacy": {
                "doseSpotPharmacyID": "31591",
                "storeName": "BC Pharmacy",
                "Address1": "CA",
                "address2": faker.location.city(),
                "city": "CA",
                "stateCode": "string",
                "zipCode": "string",
                "primaryPhone": "string",
                "primaryPhoneType": "string",
                "primaryFax": "string",
                "isPrimary": true
            }
        }
        cy.fixture<{ patientGeneralDetailsEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://patients-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const patientGeneralDetailsEndPoint =
                apiEndpoints.patientGeneralDetailsEndPoint;
            const url = `${apiUrl}${patientGeneralDetailsEndPoint}` + `${patientID}` + "/PatientGeneralDetails";
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
                        expect(response.body.result.preferredPharmacy.city).to.eq(requestBody.preferredPharmacy.city);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                 });
            });
        });
    });
});