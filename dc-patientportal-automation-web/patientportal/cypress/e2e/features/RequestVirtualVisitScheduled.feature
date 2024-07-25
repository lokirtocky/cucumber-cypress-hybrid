Feature: REQUEST VIRTUAL VISIT Scheduled

    Scenario: Verify User is able to Register a New Provider
        Given User login the application and get the Access token
        When Provider API Add Therapy Provider post Request
        And Provider Api add the Schedules of Therapy Provider Details
        And Provider Api Create Therapy Provider Slots Details
        When Enter the Email from Request payload from create provider api
        Then user should be able to see the register provider success "Account Register Successfully" message

    Scenario: Verify Primary patient able to REQUEST FOR THERAPY Consulation
        When Enter the "AutomationTesting" and "Test@1234" fields
        Then User verify dasboard page url "/dashboard" is visible
        When Click on Hamburger icon
        And  Click on Request a Visit Visit
        When Select THERAPY Vistual Visit type
        And Select State 'California' from Dropdown
        And Select Phone visit
        And Click on NEXT button
        And Submit the Informed Consent form
        And Enter the Informed Consent form '06/21/1990' input details
        Then Verify user navigates to '/request-virtual/pharmacy-detail' page url
        When Select the Reason of Visit 'Anger' from Dropdown
        And Click on NEXT button
        When Fill the intake questions and Click Next Button
        Then Verify user navigates to 'request-virtual/select-provider' page url
        And Select Providers from the list
        And Click on NEXT button
        And Select available time of provider
        Then Verify user navigates to 'request-virtual/confirm-payment' page url
        When Enter the card details for payment '4242424242424242' and '538' and '21/30' payment page
        And  Click on Confirm and Pay button
        Then Verify 'Payment Approved' message should be displayed