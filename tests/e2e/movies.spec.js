const { test, expect } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})

test('Should allow registering a new movie', async ({ page, request }) => {
    const movie = data.create

    await request.api.setToken()
    await page.movies.create(movie)

    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('Should now allow registering a new movie with an existing title', async ({ page, request }) => {
    const movie = data.duplicate

    const response = await request.post('http://localhost:3333/sessions/', {
        data: {
            email: login.email,
            password: login.password
        }
    })

    expect(response.ok()).toBeTruthy()
    console.log(await response.text())

    // await page.login.do(login.email, login.password, 'Admin')
    // await page.movies.create(movie)

    // await page.movies.create(movie)

    // await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('Should not allow registering a new movie with empty fields', async ({ page, request }) => {
    const response = await request.post('http://localhost:3333/sessions/', {
        data: {
            email: login.email,
            password: login.password
        }
    })

    expect(response.ok()).toBeTruthy()
    console.log(await response.text())

    await page.movies.goForm()
    await page.movies.submitForm()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})