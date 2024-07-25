import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Provider Schedule API", () => {
    function generateSameDayRandomDateTimes() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startHour = Math.floor(Math.random() * 24);
        const startMinute = Math.floor(Math.random() * 60);
        const startDateTime = new Date(today);
        startDateTime.setHours(startHour, startMinute);
        const endDateTime = new Date(startDateTime);
        endDateTime.setMonth(endDateTime.getMonth() + 8);
        const formatDateTime = (date:any) => {
            return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
        };

        return {
            startDateTime: formatDateTime(startDateTime),
            endDateTime: formatDateTime(endDateTime),
        };
    }

    console.log(generateSameDayRandomDateTimes());

    it("Get Schedule API  Details", () => {
        const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
        const requestBody = {
            "id": 0,
            "scheduleRecurrencesId": 0,
            "providerId": 787,
            "recurrenceType": "EveryDay",
            "recurrenceTypevalue": "Mo,Tu,We,Th,Fr,Sa,Su",
            "scheduleStartDate": startDateTime,
            "scheduleEndDate": endDateTime,
            "createdBy": "Test",
            "updatedBy": "Test",
            "createdOn": "2024-06-13T08:50:57.008Z",
            "updatedOn": "2024-06-13T08:50:57.008Z",
            "type": "O",
            "isAvailable": true,
            "statusCode": "A",
            "timezoneSelection": "CST"
        };
        cy.fixture<{ PostAppointmentSlotsEndPoint: string }>("apiEndpoints.json").then(
            (apiEndpoints) => {
                const apiUrl: string =
                    "https://provider-api." +
                    Cypress.env("env") +
                    ".dctelemedplatform.com";
                const PostAppointmentSlotsEndPoint = apiEndpoints.PostAppointmentSlotsEndPoint;
                const url =
                    `${apiUrl}${PostAppointmentSlotsEndPoint}`;
                cy.task("getAccessToken").then((token) => {
                    if (!token) {
                        throw new Error("Failed to retrieve access token");
                    }

                    const headers = AuthUtil.getHeaders(token);
                    cy.log(`API URL: ${url}`);
                    cy.log(`API Headers: ${JSON.stringify(headers)}`);
                    cy.log(`API Payload : ${JSON.stringify(requestBody)}`);
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