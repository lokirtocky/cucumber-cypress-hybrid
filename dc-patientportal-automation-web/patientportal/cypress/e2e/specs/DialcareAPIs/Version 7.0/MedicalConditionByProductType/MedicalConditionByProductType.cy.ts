import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import SecretName from "../../../../../fixtures/secretName.json";
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";

describe("validate user Medical Condition by Product Type Status info", () => {

    it("Select Medical Condition database", () => {
        cy.task("runQuery", {
            secretName: SecretName.MemberDatabase,
            query: DatabaseQuery.SelectPatientMedicationDetails,
        }).then((result: any) => {
            cy.task("log", result);
        });
    });

    it("Request Medical Condition by Product Type Details", () => {
        cy.fixture<{ MedicalInformationByProductTypeEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://patients-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const MedicalInformationByProductTypeEndPoint = apiEndpoints.MedicalInformationByProductTypeEndPoint;
                const url =
                    `${apiUrl}${MedicalInformationByProductTypeEndPoint}`;
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

    it("Select the Medical Condition info db", () => {
        cy.task("runQuery", {
            secretName: SecretName.MemberDatabase,
            query: DatabaseQuery.SelectPatientMedicationDetails,
        }).then((result: any) => {
            cy.task("log", result);
        });
    });
});