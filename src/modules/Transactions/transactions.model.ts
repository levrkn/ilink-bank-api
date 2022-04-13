import { Field, ObjectType } from '@nestjs/graphql'

import { WalletEntity } from '../Wallets/wallets.entity'

@ObjectType()
export class TransactionModel {
    @Field()
    id: string

    @Field()
    money: number

    @Field()
    from: WalletEntity

    @Field()
    to: WalletEntity
}
