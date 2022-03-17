describe('Boundary test for view/edit exercise page ', () => {

  const username = 'testusername'
  const password = 'testpassword'

  const description = "A weightlifting exercise in which one lies supine on a bench and with both hands pushes a barbell"
  const info = "weight"
  const unit = "reps"
  const duration = 50
  const calories = 200

  const makeStringWithGivenLength = (length) => {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (let i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
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
    cy.get('[name=description]')
    .type(description)
  }

  it('Test duration lower bound', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const durationValue = 0

    cy.get('[name=name]')
    .type(exercise)

    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(durationValue)
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)
    cy.contains(exercise).click().wait(1000)
    
    cy.get('[name=duration]').should('have.value', durationValue)
  })

  it('Test duration negative number', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const durationValue = -1

    cy.get('[name=name]')
    .type(exercise)

    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(durationValue)
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)
    cy.get(".alert").should("be.visible")

  })

  it('Test duration text input', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const durationValue = 'testtest'

    cy.get('[name=name]')
    .type(exercise)

    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(durationValue)
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)
    cy.get(".alert").should("be.visible")
  })

  it('Test unit input length boundary', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const unitValue = makeStringWithGivenLength(51)

    cy.get('[name=name]')
    .type(exercise)
    cy.get('[name=unit]')
    .type(unitValue)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(duration)
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)
    cy.get(".alert").should("be.visible")
  })

  it('Test unit input length lower', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const unitValue = makeStringWithGivenLength(50)

    cy.get('[name=name]')
    .type(exercise)
    cy.get('[name=unit]')
    .type(unitValue)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(duration)
    cy.get('[name=calories]')
    .type(calories)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)

    cy.contains(exercise).click().wait(1000)
    
    cy.get('[name=unit]').should('have.value', unitValue)
  })

  it('Test calories negative number', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const caloriesValue = -1

    cy.get('[name=name]')
    .type(exercise)
    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(duration)
    cy.get('[name=calories]')
    .type(caloriesValue)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)
    cy.get(".alert").should("be.visible")
  })

  
  it('Test calories lower bound', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const caloriesValue = 0

    cy.get('[name=name]')
    .type(exercise)
    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(duration)
    cy.get('[name=calories]')
    .type(caloriesValue)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)

    cy.contains(exercise).click().wait(1000)
    cy.get('[name=calories]').should('have.value', caloriesValue)
  })

  it('Test calories text input', () => {
    logInAndFillInputs()

    const exercise = makeStringWithGivenLength(20)
    const caloriesValue = 'testest'

    cy.get('[name=name]')
    .type(exercise)
    cy.get('[name=unit]')
    .type(unit)
    cy.get('[name=info]')
    .type(info)
    cy.get('[name=duration]')
    .type(duration)
    cy.get('[name=calories]')
    .type(caloriesValue)
   

    cy.get('[id=btn-ok-exercise]').click().wait(1000)
    cy.get(".alert").should("be.visible")
  })
})
