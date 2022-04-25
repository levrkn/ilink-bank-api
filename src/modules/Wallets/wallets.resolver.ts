import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { TransactionEntity } from '../Transactions/entities/transaction.entity'
import { TransactionType } from '../Transactions/graphql/transaction.type'

import { WalletEntity } from './entities/wallet.entity'
import { OperationInputType } from './graphql/operationInput.type'
import { WalletType } from './graphql/wallet.type'
import { WalletsService } from './wallets.service'

@Resolver(() => [WalletType])
export class WalletsResolver {
    constructor(private readonly _walletsService: WalletsService) {}

    @Mutation(() => WalletType, { name: 'create' })
    async create(): Promise<WalletEntity> {
        return await this._walletsService.createWallet()
    }

    @Query(() => [WalletType], { name: 'wallets' })
    async wallets(): Promise<WalletEntity[]> {
        return await this._walletsService.getAllWallets()
    }

    @Query(() => WalletType, { name: 'wallet' })
    async wallet(@Args('id') id: string): Promise<WalletEntity | undefined> {
        return await this._walletsService.findWallet(id)
    }

    @Mutation(() => TransactionType, { name: 'deposit' })
    async deposit(
        @Args('input') input: OperationInputType,
    ): Promise<TransactionEntity | Error> {
        return input.money < 0
            ? new Error('Invalid input')
            : await this._walletsService.createOperation(input)
    }

    @Mutation(() => TransactionType, { name: 'withdraw' })
    async withdraw(
        @Args('input') input: OperationInputType,
    ): Promise<TransactionEntity | Error> {
        return input.money > 0
            ? new Error('Invalid input')
            : await this._walletsService.createOperation({
                  id: input.id,
                  money: -input.money,
              })
    }

    @Mutation(() => Boolean, { name: 'close' })
    async close(@Args('id') id: string): Promise<boolean> {
        return await this._walletsService.closeWallet(id)
    }
}
