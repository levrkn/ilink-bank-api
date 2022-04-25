import { Field, ObjectType } from '@nestjs/graphql'

import { WalletType } from 'src/modules/Wallets/graphql/wallet.type'

@ObjectType()
export class TransactionType {
    @Field()
    id: string

    @Field()
    money: number

    @Field(() => WalletType)
    wallet: WalletType

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
