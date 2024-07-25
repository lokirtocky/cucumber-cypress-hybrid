import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Patient Search API", () => {
    it.skip("Patient Search API POST Request", () => {
        const apiUrl: string =
            "https://patients-api." +
            Cypress.env("env") +
            ".dctelemedplatform.com";
        const requestBody = {
            firstName: "Parminder",
            lastName: "",
            dateOfBirth: null,
            cellPhoneNumber: "",
            emailAddress: "",
            patientId: 0,
            mailingAddress1: "",
            mailingAddress2: "",
            city: "",
            state: "",
            zip: "",
            policyNumber: "",
            groupCode: "",
            pageNo: 1,
            pageSize: 100,
            productType: ""
        };
        cy.fixture<{ AdminPatientSearchPostEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const AdminPatientSearchPostEndPoint =
                apiEndpoints.AdminPatientSearchPostEndPoint;
            const url = `${apiUrl}${AdminPatientSearchPostEndPoint}`;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        });
    });

    it("Patient Search API POST Request", () => {
        const apiUrl: string =
            "https://patients-api." +
            Cypress.env("env") +
            ".dctelemedplatform.com";
        const requestBody = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dateOfBirth: null,
            cellPhoneNumber: "",
            emailAddress:
                faker.internet.userName() +
                faker.phone.number("#####") +
                "@mailinator.com",
            patientId: 0,
            mailingAddress1: faker.location.streetAddress(),
            mailingAddress2: "",
            city: faker.location.city(),
            state: "",
            zip: faker.location.zipCode("12345"),
            policyNumber: "",
            groupCode: "",
            pageNo: 1,
            pageSize: 10,
            productType: "",
        };
        cy.fixture<{ AdminMemberPatientSearchPostEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const AdminMemberPatientSearchPostEndPoint =
                apiEndpoints.AdminMemberPatientSearchPostEndPoint;
            const url = `${apiUrl}${AdminMemberPatientSearchPostEndPoint}`;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        });
    });
})