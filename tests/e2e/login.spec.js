const { test, expect } = require ('../support')
const { login } = require('../support/fixtures/login.json')

test('Should allow user to log in successfully', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin(login.email, login.password)
  
  await page.login.isLoggedIn('Admin')
})

test('Should not allow login with incorrect password', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin(login.email, 'abc123')

  await page.toast.containText('Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.')
})

test('Should not allow login with invalid email', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin('teste.com.br', login.password)
  
  await page.login.alertHaveText('Email incorreto')
})

test('Should not allow login with empty email', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin('', login.password)
  
  await page.login.alertHaveText('Campo obrigatório')
})

test('Should not allow login with empty password', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin(login.email, '')
  
  await page.login.alertHaveText('Campo obrigatório')
})

test('Should not allow login with empty email and password', async ({ page }) => {
  await page.login.visit()
  await page.login.submitLogin('', '')
  
  await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})