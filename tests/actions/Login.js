import { expect } from '@playwright/test'

export class Login {

    constructor(page) {
        this.page = page
    }

    async do(email, password) {
        this.visit()
        this.submitLogin(email, password)
        this.isLoggedIn()
    }

    async visit() {
        await this.page.goto('localhost:3000/admin/login')
    }

    async submitLogin(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        await this.page.getByText('Entrar').click()
    }

    async isLoggedIn() {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText('Olá, Admin')
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
}
