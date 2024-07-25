import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import SecretName from "../../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";

describe("validate user check patient portal info", () => {

    it("select the patient provider info database", () => {
        cy.task("runQuery", {
            secretName: SecretName.MemberDatabase,
            query: DatabaseQuery.selectPatientProvidersDb,
        }).then((result: any) => {
            cy.task("log", result);
        });
    });

    it("patients provider info post Details", () => {
        const requestBody = {
            "id": 0,
            "createdBy": "admin",
            "createdOn": "2024-07-17T07:15:09.602Z",
            "updatedBy": "admin",
            "updatedOn": "2024-07-17T07:15:09.602Z",
            "patientId": 8045,
            "providerId": 788,
            "productId": 3,
            "isPreferred": true,
            "productCode": "TH"
        };
        cy.fixture<{ SavePatientProvidersInfoEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://patients-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const SavePatientProvidersInfoEndPoint = apiEndpoints.SavePatientProvidersInfoEndPoint;
                const url =
                    `${apiUrl}${SavePatientProvidersInfoEndPoint}`;
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

    it("Select the patient provider info db", () => {
        cy.task("runQuery", {
            secretName: SecretName.MemberDatabase,
            query: DatabaseQuery.selectPatientProvidersDb,
        }).then((result: any) => {
            cy.task("log", result);
        });
    });
});