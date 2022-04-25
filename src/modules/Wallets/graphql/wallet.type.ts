import { Field, ObjectType } from '@nestjs/graphql'

import { TransactionType } from 'src/modules/Transactions/graphql/transaction.type'

@ObjectType()
export class WalletType {
    @Field()
    id: string

    @Field()
    money: number

    @Field(() => [TransactionType])
    transactions: TransactionType[]

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
