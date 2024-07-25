import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json"; 
import DatabaseQuery from "../../../../../fixtures/DatabaseQuerys.json";
import SecretName from "../../../../../fixtures/secretName.json";
import CommonPage from "cypress/e2e/pages/Common/CommonPage";

const commonPage = new CommonPage();

describe("Provider End to End Consultation", () => {
    let consultationId: any;

    it("Positive - Create appointment for patient portal API POST", () => {
        const requestBody = {
            patientId: 7102,
            patientFirstName: "DialCare",
            patientLastName: "apiAutomation",
            groupCode: "ZOP",
            appointmentType: "OnDemand",
            consultType: "Video",
            startDateTime: "2024-07-11T17:03:00",
            appointmentRequestmode: "Web",
            requestor: "DialCare",
            consultDemographicState: "CA",
            consultFee: 0,
            createdOn: "2024-06-24T09:24:45.09",
            createdBy: "admin",
            reasonForVisit: "Bad Breath",
            productType: "TD",
            dob: "1990-06-21T00:00:00",
            petGender: "M",
            patientType: "patient",
            petId: 0
        };

        cy.fixture<{ createPatientPortalAppointment: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://consultation-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const createPatientPortalAppointment =
                apiEndpoints.createPatientPortalAppointment;
            const url = `${apiUrl}${createPatientPortalAppointment}`;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        consultationId = response.body.result.id;
                        cy.log(`Consultation id is: ${consultationId}`);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        });
    });

    it("Update Consultaion API", () => {
        cy.fixture<{ updateConsultaionEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://consultation-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const updateConsultaionEndPoint = apiEndpoints.updateConsultaionEndPoint;
                const url =
                    `${apiUrl}${updateConsultaionEndPoint}` + consultationId + "/788";
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
                        apiMethods.PUT
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.task("log", `API Response: ${JSON.stringify(response.body)}`);
                    });
                });
            }
        );
    });

    it("Zoom video Signature R API POST", () => {
        const requestBody = {
            consultationId: consultationId,
            userID: "788",
            userType: "provider",
            role: 1,
        };

        cy.fixture<{ zoomSignatureRPostApiEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://consultation-api." +
                Cypress.env("env") +
                ".dctelemedplatform.com";
            const zoomSignatureRPostApiEndPoint =
                apiEndpoints.zoomSignatureRPostApiEndPoint;
            const url = `${apiUrl}${zoomSignatureRPostApiEndPoint}`;
            cy.task("getAccessToken").then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.all.keys("result", "errors");
                        expect(response.body.result).to.include.keys(
                            "signature",
                            "sessionName"
                        );
                        expect(response.body.result.signature).to.be.a("string").and.not.be
                            .empty;
                        expect(response.body.result.sessionName).to.be.a("string").and.not
                            .be.empty;
                        expect(response.body.errors).to.deep.equal({});
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        });
    });

    it('Login with DialCare User',()=>{
        cy.log("Visiting URL...");
        cy.viewport(1920, 1080);
        cy.visit(Cypress.env("url"));
        cy.task("log", "Entering credentials...");
        cy.origin(Cypress.env("redirectUrl"), () => {
            cy.get("input#signInName").type(Cypress.env("email"));
            cy.get("input#password").type(Cypress.env("password"));
            cy.get("button#next").click();
        });

        const logoutLnk = "div.ion-float-right ion-label:nth-child(2)";
        cy.waitForTextToAppear(logoutLnk, "LOG OUT");
        cy.reload();
        let enterWaitingRoomBtn = "ion-row:nth-of-type(3) > ion-col:nth-of-type(3)";
        let leaveCallBtn = '.hydrated.leave-meeting.md.padding-rem > .cursor-pointer.ion-img.margin-bottom-8.margin-top-2';
        let leaveCallTxt = '.hydrated.leave-meeting.md.padding-rem > .hydrated.md.sc-ion-label-md-h.sc-ion-label-md-s.zoom-control';
        let endVisitBtn = 'app-generic-alert-box ion-row > ion-col:nth-of-type(1)';
        let videoBtn = 'ion-col:nth-of-type(8) .cursor-pointer.ion-img.margin-bottom-10';
        let audioBtn = 'ion-col:nth-of-type(9) .cursor-pointer.ion-img.margin-bottom-10';
        cy.wait(3000);
        cy.get(enterWaitingRoomBtn).click();
        cy.waitForTextToAppear(leaveCallTxt, "LEAVE VISIT");
        cy.get(videoBtn).click();
        cy.get(audioBtn).click();
        cy.get(leaveCallBtn).click();
        cy.get(endVisitBtn).click();
        cy.waitForTextToAppear(logoutLnk, "LOG OUT");
        commonPage.logoutApplication();
    })

    it('Cancel the Appointment through API',()=>{
        const query =
            DatabaseQuery.UpdateCancelConsultation + 7102;
        cy.task("runQuery", {
            secretName: SecretName.ConsultationDatabase,
            query,
        }).then((result: any) => {
            console.log("Query result Consultation Database :", result);
        });
    })
});