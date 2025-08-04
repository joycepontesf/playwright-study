const { test } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')
const { login } = require('../support/fixtures/login.json')
const { Login } = require('../support/actions/Login')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})

test('Should allow registering a new movie', async ({ page, request }) => {
    const movie = data.create

    await page.login.do(login.email, login.password, 'Admin')

    await page.movies.create(movie)

    await page.popup.containText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('Should searching for a movie', async ({ page, request }) => {
    const movies = data.search

    movies.data.forEach(async (m) => {
        await request.api.postMovie(m)
    })

    await page.login.do(login.email, login.password, 'Admin')
    await page.movies.search(movies.input)
    await page.movies.tableHave(movies.outputs)
})

test('Should allow removing a movie', async ({ page, request }) => {
    const movie = data.to_remove

    await request.api.postMovie(movie)
    await page.login.do(login.email, login.password, 'Admin')

    await page.movies.remove(movie.title)

    await page.popup.containText(`Filme removido com sucesso.`)
})

test('Should now allow registering a new movie with an existing title', async ({ page, request }) => {
    const movie = data.duplicate

    await request.api.postMovie(movie)
    await page.login.do(login.email, login.password, 'Admin')

    await page.movies.create(movie)

    await page.popup.containText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.
`)
})

test('Should not allow registering a new movie with empty fields', async ({ page, request }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.movies.submitForm()

    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})