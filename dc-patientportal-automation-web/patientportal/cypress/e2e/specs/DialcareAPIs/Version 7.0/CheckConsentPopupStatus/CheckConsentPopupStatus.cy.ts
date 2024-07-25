import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import SecretName from "../../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";

describe("validate user check Consent Popup Status info", () => {

    it("select the Request Parental check Consent Popup database", () => {
        cy.task("runQuery", {
            secretName: SecretName.MemberDatabase,
            query: DatabaseQuery.selectRequestParentalConsentDb,
        }).then((result: any) => {
            cy.task("log", result);
        });
    });

    it("Request check Consent Popup Details", () => {
        cy.fixture<{ CheckConsentPopupStatusEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://patients-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const CheckConsentPopupStatusEndPoint = apiEndpoints.CheckConsentPopupStatusEndPoint;
                const url =
                    `${apiUrl}${CheckConsentPopupStatusEndPoint}` + 6095;
                cy.task("getAccessToken").then((token) => {
                    if (!token) {
                        throw new Error("Failed to retrieve access token");
                    }

                    const headers = AuthUtil.getHeaders(token);
                    cy.log(`API URL: ${url}`);
                    cy.log(`API Headers: ${JSON.stringify(headers)}`);
                    cy.sendRequestWithOutBody(
                        url,
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

    it("Select the check Consent Popup info db", () => {
        cy.task("runQuery", {
            secretName: SecretName.MemberDatabase,
            query: DatabaseQuery.selectRequestParentalConsentDb,
        }).then((result: any) => {
            cy.task("log", result);
        });
    });
});