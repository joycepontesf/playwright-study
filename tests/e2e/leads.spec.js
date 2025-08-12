const { test } = require ('../support')
const { faker } = require ('@faker-js/faker')

test('Should allow registering a new lead', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal(leadName, leadEmail)

  await page.popup.containText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.')
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
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal(leadName, leadEmail)

  await page.popup.containText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.')
})

test('Should not allow registering a new lead with an invalid email', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('Teste', 'teste.com')

  await page.leads.alertHaveText('Email incorreto')
})

test('Should not allow registering a new lead with an empty name', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('', 'teste@teste.com')

  await page.leads.alertHaveText('Campo obrigatório')
})

test('Should not allow registering a new lead with an empty email', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('Teste', '')

  await page.leads.alertHaveText('Campo obrigatório')
})

test('Should not allow registering a new lead with empty name and email', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('', '')

  await page.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})