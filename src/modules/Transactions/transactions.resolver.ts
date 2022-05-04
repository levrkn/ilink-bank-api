import { Args, Query, Resolver } from '@nestjs/graphql'

import { TransactionEntity } from './entities/transaction.entity'
import { TransactionType } from './graphql/transaction.type'
import { TransactionsService } from './transactions.service'

@Resolver(() => [TransactionEntity])
export class TransactionsResolver {
    constructor(private readonly _transactionsService: TransactionsService) {}

    @Query(() => [TransactionType], { name: 'transactions' })
    async transactions(): Promise<TransactionEntity[]> {
        return await this._transactionsService.getAllTransactions()
    }

    @Query(() => TransactionType, { name: 'transaction' })
    async transaction(
        @Args('id') id: string,
    ): Promise<TransactionEntity | Error> {
        return await this._transactionsService.findTransaction(id)
    }
}
