import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("New Provider list Post Request", () => {
    it("Get New Provider list Details", () => {
        const requestBody = {
            "speciality": [],
            "subSpeciality": [],
            "gender": "",
            "language": [],
            "programType": "UC",
            "state": "CA"
        };
        cy.fixture<{ NewVisitedProviderEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://provider-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const NewVisitedProviderEndPoint = apiEndpoints.NewVisitedProviderEndPoint;
                const url =
                    `${apiUrl}${NewVisitedProviderEndPoint}` + "352/NewProviders";
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
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });
});