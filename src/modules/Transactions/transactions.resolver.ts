import { Args, Query, Resolver } from '@nestjs/graphql'

import { TransactionEntity } from './transactions.entity'
import { TransactionModel } from './transactions.model'
import { TransactionsService } from './transactions.service'

@Resolver(() => [TransactionModel])
export class TransactionsResolver {
    constructor(private readonly _transactionsService: TransactionsService) {}

    @Query(() => [TransactionModel], { name: 'transactions' })
    async transactions(): Promise<TransactionEntity[]> {
        return await this._transactionsService.getAllTransactions()
    }

    @Query(() => TransactionModel, { name: 'transaction' })
    async transaction(
        @Args('id') id: string,
    ): Promise<TransactionEntity | undefined> {
        return await this._transactionsService.findTransaction(id)
    }
}
