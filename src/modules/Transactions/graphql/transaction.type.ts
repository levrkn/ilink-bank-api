import { Field, ObjectType } from '@nestjs/graphql'

import { WalletType } from 'src/modules/Wallets/graphql/wallet.type'

@ObjectType()
export class TransactionType {
    @Field()
    id: string

    @Field()
    money: number

    @Field(() => WalletType, { nullable: true })
    senderWallet: WalletType

    @Field(() => WalletType, { nullable: true })
    recieverWallet: WalletType

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
