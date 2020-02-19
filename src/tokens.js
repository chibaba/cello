const contackKit = require('@celo/contractkit')
const account = require('./accounts')

const NODE_URL = 'https://alfajores-forum.celo-testnet.org'

async function getBalances() {
  console.log('Getting your balance')
  const kit = contractKit.newKit(NODE_URL)
  const address = accounts.getAccount().address
  const balances = await kit.getTotalBalance(address)
  console.log(`Dollar balance: ${balance.usd}`)

console.log(`GoldBalance: ${balance.gold}`)
kit.stop()
}

// function sendPayment(params) {
  // async function sendPayment(params) {
    // const recipient = params.to
    // const amount = params.amount
    // const token = params.token

    // console.log()
  // }
// }

// function getBalances() {
//   console.log('Getting your balances')
// }

function sendPayment(params) {
  const recipient = params.to
  const amount = params.amount
  const token = params.token

  console.log(`Sending payment of ${amount} ${token} to ${recipient}`)

  const kit = contractKit.newKit(NODE_URL)

  const account = accounts.getAccount()
  kit.addAccount(account.privateKey)
  kit.defaultAccount = account.address
  console.log('kit account is set up')

  // Get the right token contract

  let contract
  if (token.toLowerCase() == 'cusd') {
    contract = await kit.contracts.getStableToken()
  }
  else if(token.toLowerCase() === 'cgld') {
    contract = await kit.contracts.getGoldToken()
  }
  else {
    console.log('Kit contract is setup, creating transaction')

   // console.log('Kit contract is set up, creating transaction')

    // Create the payment transaction
    const tx = await contract.transfer(recipient, amount).send()
    const receipt = await tx.waitReceipt()
    console.log('Tx receipt recieved', receipt)
    const newBalance = await contract.balanceOf(account.address)
    console.log(`New balance is ${newBalance.toString()}`)
    kit.stop()
  }

    // create the payment transaction
  }
}

module.exports = {
  getBalances,
  sendPayment
}