const { test, expect } = require('../support')
const { login } = require('../support/fixtures/login.json')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('Should allow registering a new movie', async ({ page }) => {
    const movie = data.create

    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

    await page.login.do(login.email, login.password, 'Admin')

    await page.movies.create(movie)

    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('Should not allow registering a new movie with empty fields', async ({ page }) => {
    await page.login.do(login.email, login.password, 'Admin')

    await page.movies.goForm()
    await page.movies.submitForm()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})