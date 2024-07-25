import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Last visited Provider in Virtual Visit Consultation", () => {

    it("Get Last Details", () => {
        const requestBody = {
            "speciality": [],
            "subSpeciality": [],
            "gender": "",
            "language": [],
            "programType": "TH",
            "state": "CA"
        };
        cy.fixture<{ LastVisitedProviderEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://provider-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const LastVisitedProviderEndPoint = apiEndpoints.LastVisitedProviderEndPoint;
                const url =
                    `${apiUrl}${LastVisitedProviderEndPoint}` + "352/Last-Visited";
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
