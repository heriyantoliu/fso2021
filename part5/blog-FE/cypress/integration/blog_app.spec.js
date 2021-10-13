describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    let user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)

    user = {
      name: 'Arto Hellas',
      username: 'hellas',
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

        cy.login({ username: 'hellas', password: 'salainen' })
        cy.createBlog({
          title: 'forth title',
          author: 'forth author',
          url: 'www.forth.com',
          likes: 10,
        })

        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('it can like blog', () => {
        cy.contains('second title second author').parent().as('theParent')
        cy.get('@theParent').find('#view-button').click()
        cy.get('@theParent').find('#likes').click()
        cy.get('@theParent').should('contain', 'likes 6')
      })

      it('it can remove blog', () => {
        cy.contains('second title second author').parent().as('theParent')
        cy.get('@theParent').find('#view-button').click()
        cy.get('@theParent').find('#remove-blog-button').click()
        cy.get('html').should('not.contain', 'second title second author')
      })

      it('it cannot remove blog another author', () => {
        cy.contains('forth title forth author').parent().as('theParent')
        cy.get('@theParent').find('#view-button').click()
        cy.get('@theParent').find('#remove-blog-button').click()
        cy.get('html').should('contain', 'cannot delete another user blog')
      })

      // it('sort by likes', () => {
      //   cy.get('#list-blogs>#span-blog').should((items) => {
      //     expect(items[0]).to.contain('first title first author')
      //     expect(items[1]).to.contain('third title third author')
      //     expect(items[2]).to.contain('second title second author')
      //   })
      // })
    })
  })
})
