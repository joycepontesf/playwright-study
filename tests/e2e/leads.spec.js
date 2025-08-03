const { test, expect } = require ('../support')
const { faker } = require ('@faker-js/faker')

test('Should allow registering a new lead', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal(leadName, leadEmail)

  await page.toast.containText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
})

test('Should not allow registering a new lead with an existing email', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal(leadName, leadEmail)

  await page.toast.containText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.')
})

test('Should not allow registering a new lead with an invalid email', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('Teste', 'teste.com')

  await page.landing.alertHaveText('Email incorreto')
})

test('Should not allow registering a new lead with an empty name', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('', 'teste@teste.com')

  await page.landing.alertHaveText('Campo obrigatório')
})

test('Should not allow registering a new lead with an empty email', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('Teste', '')

  await page.landing.alertHaveText('Campo obrigatório')
})

test('Should not allow registering a new lead with empty name and email', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('', '')

  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})