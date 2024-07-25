Feature: Verification of validation messages on Student and Member page fields

    Scenario: Verify validation on memberId field before verification
        When Click on Verify your Account link on login page on login page
        Then Verify validation message ' Please Enter Your Member ID ' appears

    Scenario: Verify validation message of Member First Name field before verification
        When Clear the Member firstName field
        Then Verify validation message 'Please Enter Your First Name' appears

    Scenario: Verify validation message on Member LastName field before verification
        When Clear the Member LastName field
        Then Verify validation message 'Please enter your last name. Special characters or numeric values are not allowed.' appears

    Scenario: Verify validation appears for First Name Field after Member Verification
        When Enter the Member Verification detail fields and clear First Name Field
        Then Verify validation message 'Please Enter Your First Name' appears

    Scenario: Verify validation appears for Last Name field after Member Verification
        When Enter the Member Verification detail fields and clear Last Name Field
        Then Verify validation message 'Please Enter Your Last Name' appears

    Scenario: Verify validations on Address1 field on PATIENT REGISTRATION Field
        When Clear the address field
        Then Verify validation message 'Please Enter Your Address' appears

    Scenario: Verify validations on city field on PATIENT REGISTRATION Field
        When Clear the city field
        Then Verify validation message 'Please Enter Your City' appears

    Scenario: Verify validation on Zip code field on PATIENT REGISTRATION Field
        When Clear the Zip code field
        Then Verify validation message 'Please Enter Your Zip Code' appears

    Scenario: Verify validation appears on email field message
        When Clear the email field
        Then Verify validation message 'Please Enter Your Email Address' appears

    Scenario: Verify validation message appears on Phone number field message
        When Clear the Phone number field
        Then Verify validation message 'Please Enter Your Phone Number' appears

    Scenario: Verify validation message on Student First Name field message
        When Enter invalid student details
        Then Verify verification Failed error message 'Verification failed. Please try again.' appears

    Scenario: Verify Verify successful message appears after entering valid student credentials
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url

    Scenario: Verify student first name field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        When Clears the student firstName field
        Then Verify student first name field validation message 'Please Enter Your First Name' appears

    Scenario: Verify student last name field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        When Clears the student lastName field
        Then Verify student last name field validation message 'Please Enter Your Last Name' appears

    Scenario: Verify student city field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        When Clears the student city field
        Then Verify Student city field validation message 'Please Enter Your City' appears

    Scenario: Verify Zip code field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        When Clears the student Zip code field
        Then Verify validation message appears for Zip code field

    Scenario: Verify Username field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        Then Verify the validation message of username field

    Scenario: Verify Password field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        Then Verify the validation message of password field

    Scenario: Verify confirm password field validation message
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        Then Verify the validation message of confirm password field

    Scenario: Verify Phone number field validation
        When Enter the valid student credentials
        Then Verify user navigates to "registration/student" page url
        When Clears the Phone number field
        Then Verify the validation message of phone number field