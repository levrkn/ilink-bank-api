import { testData } from './testData'

export type ExpectedType = 'user' | 'deposit' | 'transfer'

const expected = (): { [key in ExpectedType]: Record<string, unknown> } => ({
    user: {
        name: testData.userName,
        email: testData.userEmail,
    },
    deposit: {
        money: 200,
        recieverWallet: {
            id: testData.oneWalletId,
            money: 200,
            recievedTransactions: [
                {
                    money: 200,
                    recieverWallet: { id: testData.oneWalletId },
                },
            ],
        },
    },
    transfer: {
        money: 50,
        senderWallet: {
            id: testData.oneWalletId,
            money: 150,
            sendedTransactions: [
                {
                    money: 50,
                },
            ],
        },
        recieverWallet: {
            id: testData.twoWalletId,
            money: 50,
            recievedTransactions: [
                {
                    money: 50,
                },
            ],
        },
    },
})

export const getExpected = (name: ExpectedType): Record<string, unknown> =>
    expected()[name]
