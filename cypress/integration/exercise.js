describe('Boundary test for view/edit exercise page ', () => {

  const username = 'testusername'
  const password = 'testpassword'

  const exericse = "Bench-press"
  const description = "A weightlifting exercise in which one lies supine on a bench and with both hands pushes a barbell"
  const info = "weight"
  const unit = "reps"
  const duration = 50
  const calories = 200

  const makeStringWithGivenLength = (length) => {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  } 

  const logInAndFillInputs = () => {
    cy.visit('http://localhost:8001/index.html')
    cy.contains('Log in').click()

    cy.get('[name=username]')
      .type(username)
    cy.get('[name=password]')
      .type(password)
    cy.get('[id=btn-login]').click().wait(1000)

    cy.visit('http://localhost:8001/exercise.html')

    cy.get('[name=name]')
    .type(exericse)
    cy.get('[name=description]')
    .type(description)
  }

  it('Test duration input', () => {
    logInAndFillInputs()

    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type('e')
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click()
    cy.get(".alert").should("be.visible")
  })

  it('Test duration input', () => {
    logInAndFillInputs()

    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(' ')
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click()
    cy.get(".alert").should("be.visible")
  })

  it('Test calories input', () => {
    logInAndFillInputs()

    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(duration)
    cy.get('[name=calories]')
    .type(50.3)

    cy.get('[id=btn-ok-exercise]').click()
    cy.get(".alert").should("be.visible")
  })
})
