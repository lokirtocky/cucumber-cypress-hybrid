import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../fixtures/apiMethods.json";

describe("Provider Search API", () => {
    it("provider search API POST Request", () => {
        const apiUrl =
            "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
        cy.fixture<{ ProviderSearchEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const ProviderSearchEndPoint = apiEndpoints.ProviderSearchEndPoint;
                const url = `${apiUrl}${ProviderSearchEndPoint}`;
                const requestBody = {
                    firstName: "marry",
                    lastName: "",
                    emailAddress: "",
                    license: "",
                    providerLicenseState: "",
                    specialty: "",
                    network: "",
                    language: "",
                    taxId: "",
                    providerStatus: "",
                    providerNPI: "",
                    cellPhoneNumber: "",
                    pageNo: 1,
                    pageSize: 10,
                };
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.task("getAccessToken").then((token) => {
                    if (!token) {
                        throw new Error("Failed to retrieve access token");
                    }

                    const headers = AuthUtil.getHeaders(token);
                    cy.log(`API URL: ${url}`);
                    cy.log(`API Headers: ${JSON.stringify(headers)}`);
                    cy.sendRequestWithBody(
                        url,
                        requestBody,
                        headers,
                        apiMethods.POST
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });
})