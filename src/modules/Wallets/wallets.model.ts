import { Field, ObjectType } from '@nestjs/graphql'

import { TransactionEntity } from '../Transactions/transactions.entity'

@ObjectType()
export class WalletModel {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    money: number

    @Field()
    transactions: TransactionEntity[]
}
