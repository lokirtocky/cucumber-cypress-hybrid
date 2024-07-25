Feature: REQUEST VIRTUAL VISIT

    Background:
        When Enter the "AutomationTesting" and "Test@1234" fields
        Then User verify dasboard page url "/dashboard" is visible
        When Click on Hamburger icon
        And  Click on Request a Visit Visit

     Scenario: Verify Primary patient able to REQUEST FOR TELEDENTISTRY Consulation
         When Select TELEDENTISTRY Vistual Visit type
         And Select State 'California' from Dropdown
         And Select Phone visit
         And Click on NEXT button
         Then Verify user navigates to '/request-virtual/pharmacy-detail' page url
         When Select the Reason of Visit 'Black Teeth ' from Dropdown
         And Click on Change button
         And Enter the Zip code '12345' and click on SEARCH button
         And Select pharmacy from list and click NEXT
         And Click on CONFIRM button
         And Click on NEXT button on pharmacy Details page
         Then Verify user navigates to 'request-virtual/intake-questions' page url
         When Fill the intake questions and Click Next Button
         And Submit the Consent To Treat form
         Then Verify user navigates to 'request-virtual/confirm-payment' page url
         When Enter the card details for payment '4242424242424242' and '538' and '21/30' payment page
         And  Click on Confirm and Pay button
         Then Verify 'Payment Approved' message should be displayed

    Scenario: Verify Primary patient able to REQUEST FOR URGENT CARE Consulation
        When Select URGENT CARE Vistual Visit type
        And Select State 'California' from Dropdown
        And Select Phone visit
        And Click on NEXT button
        Then Verify user navigates to '/request-virtual/pharmacy-detail' page url
        When Select the Reason of Visit 'Covid-19 ' from Dropdown
        And Click on Change button
        And Enter the Zip code '12345' and click on SEARCH button
        And Select pharmacy from list and click NEXT
        And Click on CONFIRM button
        And Click on NEXT button on pharmacy Details page
        Then Verify user navigates to 'request-virtual/intake-questions' page url
        When Fill the intake questions and Click Next Button
        And Submit the Consent To Treat form
        Then Verify user navigates to 'request-virtual/confirm-payment' page url
        When Enter the card details for payment '4242424242424242' and '538' and '21/30' payment page
        And  Click on Confirm and Pay button
        Then Verify 'Payment Approved' message should be displayed

    Scenario: Verify primary patient able to request for Virtual Visit consultation
        When Select the Pet radio button
        And Select State 'California' from Dropdown
        And Select Virtual Visit Consultation
        And Select Phone visit
        And Click on NEXT button
        Then Verify user navigates to '/request-virtual/pharmacy-detail' page url
        When Select the Reason of Visit 'Fever ' from Dropdown
        And Click on NEXT button
        Then Verify user navigates to 'request-virtual/intake-questions' page url
        When Fill the intake questions and Click Next Button
        Then Verify user navigates to 'request-virtual/confirm-payment' page url
        When Enter the card details for payment '4242424242424242' and '538' and '21/30' payment page
        And  Click on Confirm and Pay button
        Then Verify 'Payment Approved' message should be displayed