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

    it('createWallet', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: getSchema('createWallet'),
            })
            .expect((res) => {
                const data = res.body.data.createWallet
                testData.walletId = data.id
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
                    money: 100,
                    wallet: {
                        id: testData.walletId,
                        money: 100,
                        transactions: [
                            {
                                money: 100,
                            },
                        ],
                    },
                })
            }))
})
