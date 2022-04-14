import { Args, Query, Resolver } from '@nestjs/graphql'

import { Transaction } from './transactions.entity'
import { TransactionsService } from './transactions.service'

@Resolver(() => [Transaction])
export class TransactionsResolver {
    constructor(private readonly _transactionsService: TransactionsService) {}

    @Query(() => [Transaction], { name: 'transactions' })
    async transactions(): Promise<Transaction[]> {
        return await this._transactionsService.getAllTransactions()
    }

    @Query(() => Transaction, { name: 'transaction' })
    async transaction(
        @Args('id') id: string,
    ): Promise<Transaction | undefined> {
        return await this._transactionsService.findTransaction(id)
    }
}
