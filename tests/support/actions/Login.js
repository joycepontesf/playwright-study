require('dotenv').config()
 
import { expect } from '@playwright/test'

export class Login {

    constructor(page) {
        this.baseURL = process.env.BASE_URL
        this.page = page
    }

    async do(email, password, username) {
        await this.visit()
        await this.submitLogin(email, password)
        await this.isLoggedIn(username)
    }

    async visit() {
        await this.page.goto(this.baseURL + '/admin/login')
    }

    async submitLogin(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        await this.page.getByText('Entrar').click()
    }

    async isLoggedIn(username) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
}
