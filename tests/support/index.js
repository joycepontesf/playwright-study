const { test: base, expect } = require('@playwright/test')

const { Login } = require('../pages/Login')
const { Toast } = require('../pages/Components')
const { Movies } = require('../pages/Movies')
const { LandingPage } = require('../pages/LandingPage')

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new Login(page),
            movies: new Movies(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }