import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { testData } from './testData'

export type SchemasType = 'createUser' | 'createWallet' | 'deposit' | 'transfer'

const schemas = (): { [key in SchemasType]: DocumentNode } => ({
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

export const getSchema = (name: SchemasType): string =>
    schemas()[name]?.loc?.source.body || ''
