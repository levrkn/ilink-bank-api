import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import {} from 'graphql'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'

const SUCCESS_RESPONSE_CODE = 200

describe('Wallets resolver', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })
    let walletId: string

    it('create', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation { create { id } }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                walletId = res.body.data.create.id
            }))

    it('deposit', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation { deposit (input: {id: "${walletId}", money: 400}) { money wallet { id money } } }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                const data = res.body.data.deposit
                expect(data).toEqual({
                    money: 400,
                    wallet: {
                        id: walletId,
                        money: 400,
                    },
                })
            }))

    it('withdraw', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation { withdraw (input: {id: "${walletId}", money: 300}) { money wallet { id money } } }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                const data = res.body.data.withdraw
                expect(data).toEqual({
                    money: -300,
                    wallet: {
                        id: walletId,
                        money: 100,
                    },
                })
            }))

    it('wallets', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `{ wallets { id money } }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                const data = res.body.data.wallets
                expect(data).toEqual([
                    {
                        id: walletId,
                        money: 100,
                    },
                ])
            }))

    it('wallet', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `{ wallet (id: "${walletId}") { id money } }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                const data = res.body.data.wallet
                expect(data).toEqual({
                    id: walletId,
                    money: 100,
                })
            }))

    it('close', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation { close (id: "${walletId}") }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                const data = res.body.data.close
                expect(data).toEqual(true)
            }))

    it('wallet', () =>
        request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `{ wallet (id: "${walletId}") { id money } }`,
            })
            .expect(SUCCESS_RESPONSE_CODE)
            .expect((res) => {
                const { data } = res.body
                expect(data).toEqual(null)
            }))
})
