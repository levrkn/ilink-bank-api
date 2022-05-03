import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'

import { getSchema } from './graphql/getSchema'
import { testData } from './graphql/testData'

describe('All resolvers', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('createUser', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: getSchema('createUser'),
            })
            .expect((res) => {
                const data = res.body.data.createUser
                expect(data).toEqual({
                    name: testData.userName,
                    email: testData.userEmail,
                })
            }))

    it('createOneWallet', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: getSchema('createWallet'),
            })
            .expect((res) => {
                const data = res.body.data.createWallet
                testData.oneWalletId = data.id
            }))

    it('createTwoWallet', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: getSchema('createWallet'),
            })
            .expect((res) => {
                const data = res.body.data.createWallet
                testData.twoWalletId = data.id
            }))

    it('deposit', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: getSchema('deposit'),
            })
            .expect((res) => {
                const data = res.body.data.deposit
                expect(data).toEqual({
                    money: 200,
                    recieverWallet: {
                        id: testData.oneWalletId,
                        money: 200,
                        recievedTransactions: [
                            {
                                money: 200,
                                wallet: { id: testData.oneWalletId },
                            },
                        ],
                    },
                })
            }))

    it('transfer', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: getSchema('transfer'),
            })
            .expect((res) => {
                const data = res.body.data.transfer
                expect(data).toEqual({
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
                        user: {
                            email: testData.userEmail,
                        },
                        recievedTransactions: [
                            {
                                money: 50,
                            },
                        ],
                    },
                })
            }))
})
