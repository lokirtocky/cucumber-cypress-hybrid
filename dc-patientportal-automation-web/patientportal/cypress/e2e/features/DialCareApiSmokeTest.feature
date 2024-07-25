Feature: A user should able to pay the Consultaion Payment in patient portal

    Background:
        Given User login the application and get the Access token

    Scenario: Verify user should able to pay the payment through the apis
        When User should Create appointment for patient portal through API
        And User should pay the consultaion Payment through API

    Scenario: User able to search patient through Api
        When User should be able to search "Parminder" patient

    Scenario: USer able to search provider through Api
        When User should be able to search "marry" provider

    Scenario: User able to search Phramacy using dose spot api
        When User should be able to search "12345" Phramcay by zip code

    Scenario: User able to get States using api
        When User should be able to get the all states

    Scenario: User should able to send email through Api
        When Dialcare user Creates the Appointment
        When User Update Consultation Status With Id
        When Dial care user Invite Zoom Link with "dialcare01@gmail.com" email API
        Then Fetch the Invite zoom emails from a Specified User from gmail

    Scenario: Verify Smarty API is auto Suggesting through API
        When Get auto complete address API GET
        Then Smarty suggested-address "123 1/2 10th Ave" city "South Charleston" state "WV" zipCode "25303" API POST
        And Verify Address  Smarty suggested-address "123 1/2 10th Ave" city "South Charleston" state "WV" zipCode "25303" API POST