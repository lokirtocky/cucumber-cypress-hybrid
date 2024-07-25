import { faker } from '@faker-js/faker';
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Add Provider And Schedule for VV", () => {
    let providerId: any;
    it("Add Provider VV post Request", () => {
        function generateSameDayRandomDateTimes() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDateTime = new Date(today);
            startDateTime.setDate(startDateTime.getDate() + 1);

            const startHour = Math.floor(Math.random() * 24);
            const startMinute = Math.floor(Math.random() * 60);
            startDateTime.setHours(startHour, startMinute);

            const endDateTime = new Date(startDateTime);
            endDateTime.setDate(startDateTime.getDate() + 100)
            endDateTime.setHours(endDateTime.getHours(), startMinute + 30);

            const formatDateTime = (date: any) => {
                return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
            };

            return {
                startDateTime: formatDateTime(startDateTime),
                endDateTime: formatDateTime(endDateTime),
            };
        }

        const randomDateTimes = generateSameDayRandomDateTimes();

        const requestBody = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "middleInitial": "s",
            "gender": "M",
            "dob": faker.date.past(50, new Date()).toISOString().split('T')[0] + 'T00:00:00.000Z',
            "tin": faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
            "npi": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
            practicingSince: faker.date.past(20, new Date()).getFullYear(),
            agesTreatedFrom: faker.datatype.number({ min: 0, max: 10 }),
            agesTreatedTo: faker.datatype.number({ min: 11, max: 100 }),
            speciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            subSpeciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            "statusCode": "A",
            "createdBy": "system",
            "updatedBy": "system",
            "specialityOther": null,
            "profiles": [
                {
                    "providerId": 0,
                    "personalSuffix": "I",
                    "professionalSuffix": "D.O.",
                    "aliasName": "eee",
                    "preferredTimeZone": randomDateTimes.startDateTime,
                    "clientCode": "code",
                    "networkCode": "DCVV",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "contacts": [
                {
                    "providerId": 0,
                    "entityType": "email",
                    "contact": faker.person.firstName() + faker.person.lastName() + "001" + "VV@mailinator.com",
                    "isPrimary": true,
                    "receiveNotification": true,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "entityType": "Phone",
                    "contact": faker.phone.number("##########"),
                    "isPrimary": true,
                    "receiveNotification": false,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "addresses": [
                {
                    "providerId": 0,
                    "addressType": "B",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "stateCode": "AL",
                    "zip": "75034",
                    "timeZone": "CST",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "addressType": "M",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "zip": "75034",
                    "timeZone": "CST",
                    "stateCode": "AL",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "academics": [
                {
                    "providerId": 0,
                    "schoolName": "Christ the king convent school",
                    "degree": "high school",
                    "graduationDate": "2024-02-13T09:39:56.743Z",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "languages": [
                {
                    "providerId": 0,
                    "language": "EN",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "id": 0,
            "createdOn": "2024-02-13T09:39:56.743Z",
            "updatedOn": "2024-02-13T09:39:56.743Z",
            "licenses": [{
                "providerId": 0,
                "stateCode": "CA",
                "licenseNumber": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
                "licenseStatus": "Active",
                "expirationDate": randomDateTimes.endDateTime,
                "modeOfVerification": "https://www.bhec.texas.gov/verify-a-license/index.html",
                "statusCode": "A",
                "id": 0,
                "createdBy": "string",
                "createdOn": "2023-07-06T15:38:31.763",
                "updatedBy": "string",
                "updatedOn": "2024-02-16T10:29:13.633"
            }]
        };

        cy.fixture<{ AddProviderEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
            const AddProviderEndPoint =
                apiEndpoints.AddProviderEndPoint;
            const url = `${apiUrl}${AddProviderEndPoint}`;
            cy.task('getAccessToken').then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(201);
                        providerId = response.body.id;
                        cy.wrap(providerId).as('providerId');
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                        const emailContact = requestBody.contacts.find(contact => contact.entityType === 'email');
                        if (emailContact) {
                            const email = emailContact.contact;
                            const mailinatorUrl = `https://www.mailinator.com/v4/public/inboxes.jsp?to=${email}`;
                            cy.viewport(1920, 1080);
                            cy.visit(mailinatorUrl);
                            const clickFirstIndex = 'table[class="table-striped jambo_table"] tbody tr:nth-child(1) td:nth-child(2)';

                            cy.on('uncaught:exception', (e) => {
                                if (e.message.includes('Things went bad')) {
                                    return false;
                                }
                            });
                            cy.get(clickFirstIndex).first().click();
                            cy.get('iframe#html_msg_body', { timeout: 60000 }).should('be.visible').then($iframe => {
                                const $body = $iframe.contents().find('body');
                                cy.wrap($body).find('a.button-a.button-a-primary').should('have.attr', 'href').then(($href) => {
                                    const href = $href as unknown as string;
                                    cy.task('log', href);
                                    cy.visit(href);
                                });
                            });
                        } else {
                            throw new Error("Email contact not found in the request body");
                        }
                    }
                );
            });
        });
        let inputPassword = ' div:nth-child(2) > div.form-floating.required.col-md-10.d-flex.flex-row.align-items-center > input';
        let inputConfirmPassword = ' div:nth-child(3) > div.form-floating.required.col-md-10.d-flex.flex-row.align-items-center > input';
        let submitBtn = ' div:nth-child(4) > div.form-floating.required.col-md-10.d-flex.flex-row.align-items-center > button';
        cy.get(inputPassword).type('Test@123');
        cy.get(inputConfirmPassword).type('Test@123');
        cy.get(submitBtn).click();
        cy.contains('Account registered successfully');
    });

    function generateSameDayRandomDateTimes() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDateTime = new Date(today);
        startDateTime.setDate(startDateTime.getDate() + 1);
        const startHour = Math.floor(Math.random() * 24);
        const startMinute = Math.floor(Math.random() * 60);
        startDateTime.setHours(startHour, startMinute);
        const endDateTime = new Date(startDateTime);
        endDateTime.setMonth(endDateTime.getMonth() + 8);
        const formatDateTime = (date: any) => {
            return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
        };

        return {
            startDateTime: formatDateTime(startDateTime),
            endDateTime: formatDateTime(endDateTime),
        };
    }

    it("Get Schedule API  Details", () => {
        const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
        const requestBody = {
            "id": 0,
            "scheduleRecurrencesId": 0,
            "providerId": providerId,
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

    it("Create Provider Slots Details", () => {
        const apiUrl = "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
        cy.fixture<{ ScheduleRecurrenceEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const ScheduleRecurrenceEndPoint =
                apiEndpoints.ScheduleRecurrenceEndPoint;
            const url = `${apiUrl}${ScheduleRecurrenceEndPoint}`;
            const { startDateTime, endDateTime } = generateSameDayRandomDateTimes();
            const requestBody = {
                ProviderId: providerId,
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