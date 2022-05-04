import { Field, ObjectType } from '@nestjs/graphql'

import { WalletType } from 'src/modules/Wallets/graphql/wallet.type'

@ObjectType()
export class UserType {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    email: string

    @Field(() => [WalletType])
    wallets: WalletType[]

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
