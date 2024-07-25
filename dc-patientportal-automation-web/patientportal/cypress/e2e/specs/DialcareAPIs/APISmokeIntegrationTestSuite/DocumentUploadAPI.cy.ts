import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../fixtures/apiMethods.json";

describe("Document Upload API", () => {
    const apiUrl: string = Cypress.env("apiUrl");

    it("Document Upload POST Request", () => {
        cy.fixture("apiEndpoints.json").then((apiEndpoints: any) => {
            const documentUploadEndpoint: string = apiEndpoints.profileImagePostEndpoint;
            const url: string = `${apiUrl}${documentUploadEndpoint}`;

            cy.task<string>("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers: { [key: string]: string } = AuthUtil.getHeadersWithFromData(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);

                const filePath = "image.png";
                cy.fixture(filePath, "binary")
                    .then((file) => Cypress.Blob.binaryStringToBlob(file))
                    .then((blob) => {
                        var formData = new FormData();
                        formData.set('FileData', blob, filePath);
                        formData.append("TypeId", "133");
                        formData.append("Type", "Patient");
                        formData.append("UpdatedBy", blob, filePath)

                        for (const pair of formData.entries()) {
                            cy.task('log', `FormData: ${pair[0]} = ${pair[1]}`);
                        }

                        cy.sendRequestWithBody(url, formData, headers, apiMethods.POST).then(
                            (response) => {
                                expect(response.status).to.eq(200);
                                cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                            }
                        )
                    })
            });
        });
    });
});