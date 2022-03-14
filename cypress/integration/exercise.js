describe('My First Test', () => {

  const username = 'abc'
  const password = '123'

  it('Visits the Kitchen Sink', () => {

    // cy.visit('http://localhost:8001/exercises.html', {
    //   auth: {
    //     username,
    //     password,
    //   },
    // })

    // cy.contains('Create new exercise').click()


    cy.visit('http://localhost:8001/index.html')
    
    cy.contains('Log in').click()

    cy.get('.username')
      .type('abc')

    cy.get('.password')
      .type('123')

    cy.get('[id=btn-login]').click().wait(1000)

    cy.visit('http://localhost:8001/index.html')

    //cy.contains('Exercises').click({force: true})
    //cy.get('[id=nav-exercises]').click()

    

    //cy.get('[id=inputName]').type('test')
  })
})
