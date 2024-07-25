import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Key Vault checking", () => {

    it.skip("Get Key Vault result Details for Patient", () => {
        cy.fixture<{ PatientKeyVaultEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://patients-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const PatientKeyVaultEndPoint = apiEndpoints.PatientKeyVaultEndPoint;
                const url =
                    `${apiUrl}${PatientKeyVaultEndPoint}`;
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
                        apiMethods.GET
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });

    it.skip("Get Key Vault result Details for Consultaion", () => {
        cy.fixture<{ ConsultationsKeyVaultEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://consultation-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const ConsultationsKeyVaultEndPoint = apiEndpoints.ConsultationsKeyVaultEndPoint;
                const url =
                    `${apiUrl}${ConsultationsKeyVaultEndPoint}`;
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
                        apiMethods.GET
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });

    it.skip("Get Key Vault result Details for Configuration", () => {
        cy.fixture<{ configurationsKeyVaultEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://config-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const configurationsKeyVaultEndPoint = apiEndpoints.configurationsKeyVaultEndPoint;
                const url =
                    `${apiUrl}${configurationsKeyVaultEndPoint}`;
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
                        apiMethods.GET
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });

    it.skip("Get Key Vault result Details for Provider", () => {
        cy.fixture<{ providerKeyVaultEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://provider-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const providerKeyVaultEndPoint = apiEndpoints.providerKeyVaultEndPoint;
                const url =
                    `${apiUrl}${providerKeyVaultEndPoint}`;
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
                        apiMethods.GET
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });
});
