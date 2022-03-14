const { beforeEach } = require("mocha")

describe('Register boundry test', () => {

    const username = 'testusername'
    const email = 'testemail@test.com'
    const password = 'testpassword'
    const password1 = 'testpassword1'
    const phone_number = "90909090"
    const country = 'Norway'
    const city = 'Kopervik'
    const address = 'Stokkastrand'


    beforeEach(() => {
        cy.visit('http://localhost:8001/register.html')
    })

    it('username', () => {    
  
      cy.get('[name=username]')
        .type(username, {force: true})

        cy.get('[name=email]')
            .type(email)

        cy.get('[name=password]')
        .type(password)

        cy.get('[name=password1]')
        .type(password1)

        cy.get('[name=phone_number]')
        .type(phone_number)

        cy.get('[name=country]')
        .type(country)  

        cy.get('[name=city]')
        .type(city)

        cy.get('[name=street_address]')
        .type(address)        

        cy.get('[id=btn-create-account]').click()
    })
  })
  