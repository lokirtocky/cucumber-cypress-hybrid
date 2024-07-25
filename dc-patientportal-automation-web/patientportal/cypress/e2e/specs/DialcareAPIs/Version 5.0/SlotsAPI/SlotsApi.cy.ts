import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Slots APIs Post Request", () => {

    function generateSameDayRandomDateTimes() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startHour = Math.floor(Math.random() * 23);
        const startMinute = Math.floor(Math.random() * 60);
        const startDateTime = new Date(today);
        startDateTime.setHours(startHour, startMinute);
        const durationMinutes = 30 + Math.floor(Math.random() * 91);
        const endDateTime = new Date(
            startDateTime.getTime() + durationMinutes * 60000
        );
        const formatDateTime = (date: any) => {
            return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
        };

        return {
            startDateTime: formatDateTime(startDateTime),
            endDateTime: formatDateTime(endDateTime),
        };
    }

    it("Create Slots Details", () => {
        const apiUrl = "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
        cy.fixture<{ ScheduleRecurrenceEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const ScheduleRecurrenceEndPoint =
                apiEndpoints.ScheduleRecurrenceEndPoint;
            const url = `${apiUrl}${ScheduleRecurrenceEndPoint}`;
            const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
            const requestBody = {
                ProviderId: 787,
                ScheduleStartDate: startDateTime,
                ScheduleEndDate: endDateTime,
            };
            cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
            cy.task('getAccessToken').then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(200);
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        })
    })
});