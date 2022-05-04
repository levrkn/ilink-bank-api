import { Field, ObjectType } from '@nestjs/graphql'

import { TransactionType } from 'src/modules/Transactions/graphql/transaction.type'
import { UserType } from 'src/modules/Users/graphql/user.type'

@ObjectType()
export class WalletType {
    @Field()
    id: string

    @Field()
    money: number

    @Field(() => [TransactionType])
    sendedTransactions: TransactionType[]

    @Field(() => [TransactionType])
    recievedTransactions: TransactionType[]

    @Field(() => UserType)
    user: UserType

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
