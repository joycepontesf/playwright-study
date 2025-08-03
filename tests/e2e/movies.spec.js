const { test, expect } = require('../support')
const { login } = require('../support/fixtures/login.json')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('Should allow registering a new movie', async ({ page }) => {
    const movie = data.create

    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

    await page.login.visit()
    await page.login.submitLogin(login.email, login.password)
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})