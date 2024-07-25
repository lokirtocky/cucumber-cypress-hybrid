Feature: My Account Scenarios

    Scenario: Verify Primary Patient can add Spouse and Underaged Dependent and Spouse can Edit Medical Conditions for Underaged Dependent
        When Enter the member verification "113001" and "MW" and  "Nofee" details
        Then Verify 'Verified Successfully' success message is displayed
        Then Verify user navigates to 'registration/patient' page url
        When Select the Preffered language from the dropdown and select the address
        And Enter the Registration details for user to be registered
        And Click on TERMS and CONDITIONS checkbox
        And Click on Go to Dashboard button
        And Logout the user
        And Login with new credentials with user
        Then User verify dasboard page url "/dashboard" is visible
        When Click on Hamburger icon
        And Click on My Account from hamburger
        And Click on Dependents tab under MyAccounts
        Then Verify user navigates to 'my-account-info/dependent-information' page url
        When Click on Add button
        And Enter the details to ADD Spouse details
        And Click on SAVE button
        And Click on Back icon
        When Click on Add button
        And Enter the Underaged Dependent details
        And Click on SAVE button 
        And Click on Dependent for spouse to grant the access to add the medical Conditions
        And Click on Confirm button to grant the access
        And Navigates to the mailinator and Register the Spouse
        And Click on Go to Dashboard button
        And Click on My Account from hamburger
        And Click on Dependents tab under MyAccounts
        Then Verify user navigates to 'my-account-info/dependent-information' page url
        And Click on underaged Dependent on spouse page
        And Enter the Medical conditions for the underaAged dependent

    Scenario: Verify primary patient able to Add and Delete PET Information
        When Enter the "AutomationTesting" and "Test@1234" fields
        Then User verify dasboard page url "/dashboard" is visible
        When Click on Hamburger icon
        And Click on My Account from hamburger
        Then Verify user navigates to "my-account-info" page url
        When Click on PETs on My Account
        Then Verify user navigates to 'my-account-info/pet-information' page url
        And click on Add button
        And Add Pets Information fields
        And Click on Continue button
        Then Verify "Pet successfully added" Toast Message is displayed
        And Click on newly added Pet
        And Click on Delete button
        Then Verify "Deleted Successfully" Toast Message is displayed