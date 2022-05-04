import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { SchemasType } from './getSchema'
import { testData } from './testData'

export const schemas = (): { [key in SchemasType]: DocumentNode } => ({
    createUser: gql`
      mutation {
          createUser (input: { name: "${testData.userName}", email: "${testData.userEmail}" }) {
              name
              email
          }
      }
  `,
    createWallet: gql`
      mutation {
          createWallet (userName: "${testData.userName}") {
              id
          }
      }
  `,
    deposit: gql`
    mutation {
        deposit (input: { id: "${testData.oneWalletId}", money: 200 }) {
            money
            recieverWallet {
                id
                money
                recievedTransactions {
                    money
                    recieverWallet {
                        id
                    }
                }
            }
        }
    }
`,
    transfer: gql`
    mutation {
        transfer (input: { senderWalletId: "${testData.oneWalletId}", recieverWalletId: "${testData.twoWalletId}", money: 50 }) {
            money
            senderWallet {
                id
                money
                sendedTransactions {
                    money
                }
            }
            recieverWallet {
                id
                money
                recievedTransactions {
                    money
                }
            }
        }
    }
`,
})
