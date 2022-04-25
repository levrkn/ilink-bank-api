import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
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
})
