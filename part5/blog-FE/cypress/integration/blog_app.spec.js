describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', () => {
    cy.contains('Blogs')
  })

  it('Login form is show', () => {
    cy.contains('login').click()
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('#title').type('E2E by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.abc.com')
      cy.get('#create-blog-button').click()
      cy.contains('E2E by Cypress')
    })

    describe('and several blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'first title',
          author: 'first author',
          url: 'www.first.com',
          likes: 0,
        })
        cy.createBlog({
          title: 'second title',
          author: 'second author',
          url: 'www.second.com',
          likes: 5,
        })
        cy.createBlog({
          title: 'third title',
          author: 'third author',
          url: 'www.third.com',
          likes: 2,
        })
      })

      it('it can like blog', () => {
        cy.contains('second title second author').parent().as('theParent')
        cy.get('@theParent').find('#view-button').click()
        cy.get('@theParent').find('#likes').click()
        cy.get('@theParent').should('contain', 'likes 6')
      })
    })
  })
})
