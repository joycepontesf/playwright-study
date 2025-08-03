import { expect } from '@playwright/test'

export class Login {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('localhost:3000/admin/login')
    }

    async submitLogin(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        await this.page.getByText('Entrar').click()
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
}
