describe('regestration form', () => {
  it('error empty field', () => {
    cy.visit('/regester')

    cy.get("[data-cy='name-input']").type('david')
    cy.get("[data-cy='email-input']").type('davidmmyh@gmail.com')
    cy.get("[data-cy='password-input']").type('123')
    cy.get("[data-cy='confirm-input']").type('000')
    cy.get('[data-cy="regester-form"]').submit()
    cy.get('[data-cy="message"]').should('exist')
    cy.get('[data-cy="message"]').contains('Passsword and confirm password are not matching.')
  })

  it('Regester Used Email', () => {
    cy.visit('/regester')

    cy.get("[data-cy='name-input']").type('david')
    cy.get("[data-cy='email-input']").type('email@gmail.com')
    cy.get("[data-cy='password-input']").type('123')
    cy.get("[data-cy='confirm-input']").type('123')
    cy.get('[data-cy="user-switch"]').click()
    cy.get('[data-cy="user-switch"]').should('have.class','bg-primary')
    cy.get('[data-cy="regester-form"]').submit()
    cy.get('[data-cy="message"]').should('exist')
    cy.get('[data-cy="message"]').contains('Email Already Regestered.')
  })

  it('Regester Used Email', () => {
    cy.visit('/regester')

    cy.get("[data-cy='name-input']").type('david')
    cy.get("[data-cy='email-input']").type('email@gmail.com')
    cy.get("[data-cy='password-input']").type('123')
    cy.get("[data-cy='confirm-input']").type('123')
    cy.get('[data-cy="user-switch"]').click()
    cy.get('[data-cy="user-switch"]').should('have.class','bg-primary')
    cy.get('[data-cy="regester-form"]').submit()
    cy.get('[data-cy="message"]').should('exist')
    cy.get('[data-cy="message"]').contains('Email Already Regestered.')
  })
})