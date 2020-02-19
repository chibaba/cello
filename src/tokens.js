const contackKit = require('@celo/contractkit')
const account = require('./accounts')

const NODE_URL = 'https://alfajores-forum.celo-testnet.org'

async function getBalances() {
  console.log('Getting your balance')
  const kit = contractKit.newKit(NODE_URL)
  const address = accounts.getAccount().address
  const balances = await kit.getTotalBalance(address)
  console.log(`Dollar balance: ${balance.usd}`)

console.log(`GoldBalance: ${balance.gold}`)}

// function getBalances() {
//   console.log('Getting your balances')
// }

function sendPayment(params) {
  const recipient = params.to
  const amount = params.amount
  const token = params.token

  console.log(`Sending payment of ${amount} ${token} to ${recipient}`)
}

module.exports = {
  getBalances,
  sendPayment
}