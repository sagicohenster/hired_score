describe('Home Assignment', () => {
  it('Automation Infrastructure', () => {
    
    //Go to example.cypress.io
    cy.visit('https://example.cypress.io/')

    //Go to Querying page from top bar (Commands menu > Querying menu item)	
    cy.get('.dropdown').click().contains('Querying').click()

    //Validate 'Best Practices' hyperlink by attribute & URL
    cy.get('#best-practices').find('a').should('have.attr', 'href').and('equal', 'https://on.cypress.io/best-practices#Selecting-Elements')

    //Verify API Jsonbin response (status & num of elements) and extract team name of first element
    cy.request('https://api.jsonbin.io/v3/b/62e129e3248d43754f074152').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.record).to.have.length(5)
      cy.wrap(res.body.record[0].team).as('team_name')
    })

    //Type extracted team name into 'Name' input box of Querying page
    cy.get('@team_name').then((team_name) => {
        cy.get('#inputName').type(team_name)
    })
  })
})