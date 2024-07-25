import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("UHC sky jan external Search checking API", () => {

    it("Get uhc skygen External Search Member Details for Patient", () => {
        const requestBody = {
            "memberId": null,
            "lastName": null,
            "firstName": "DEVIN",
            "dateOfBirth": null,
            "subscriberId": "125583618"
        };
        cy.fixture<{ uhcSkyGenExternalSearchEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://config-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const uhcSkyGenExternalSearchEndPoint = apiEndpoints.uhcSkyGenExternalSearchEndPoint;
                const url =
                    `${apiUrl}${uhcSkyGenExternalSearchEndPoint}`;
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