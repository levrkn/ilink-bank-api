import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { testData } from './testData'

type SchemasType = 'createUser' | 'createWallet' | 'deposit'

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
        deposit (input: { id: "${testData.walletId}", money: 100 }) {
            money
            wallet {
                id
                money
                transactions {
                    money
                }
            }
        }
    }
`,
})
