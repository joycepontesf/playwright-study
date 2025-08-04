const { expect } = require('@playwright/test')
const { login } = require('../fixtures/login.json')

export class Api {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions/', {
            data: {
                email: login.email,
                password: login.password
            }
        })
        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = body.token
    }
}