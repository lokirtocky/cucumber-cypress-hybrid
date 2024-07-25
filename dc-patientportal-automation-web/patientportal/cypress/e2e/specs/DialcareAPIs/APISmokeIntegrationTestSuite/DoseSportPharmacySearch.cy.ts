import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../fixtures/apiMethods.json";

describe("Dose Spot API Test", () => {
    interface Pharmacy {
        pharmacyId: number;
        storeName: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        primaryPhone: string;
        primaryPhoneType: number;
        primaryFax: string;
    }

    interface Result {
        items: Pharmacy[];
        result: {
            resultCode: string;
            resultDescription: string;
        };
    }

    interface ApiResponse {
        result: Result;
        errors: any;
    }

    it("DoseSpot Pharmacy Search ZipCode And PharmacyName API GET Request", () => {
        const apiUrl =
            "https://consultation-api." + Cypress.env("env") + ".dctelemedplatform.com";
        cy.fixture<{
            PharmacySearchEndPoint: string;
        }>("apiEndpoints.json").then((apiEndpoints) => {
            const PharmacySearchEndPoint =
                apiEndpoints.PharmacySearchEndPoint;
            const url = `${apiUrl}${PharmacySearchEndPoint}` + 12345;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }
                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
                    (response) => {
                        const responseBody: ApiResponse = response.body;
                        expect(response.status).to.eq(200);
                        cy.log(`API Response: ${JSON.stringify(responseBody)}`);
                        expect(responseBody).to.have.property("result");
                    }
                );
            });
        });
    });
})