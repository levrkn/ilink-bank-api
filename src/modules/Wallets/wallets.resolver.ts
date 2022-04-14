import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Transaction } from '../Transactions/transactions.entity'

import { OperationInput, Wallet } from './wallets.entity'
import { WalletsService } from './wallets.service'

@Resolver(() => [Wallet])
export class WalletsResolver {
    constructor(private readonly _walletsService: WalletsService) {}

    @Mutation(() => Wallet, { name: 'create' })
    async create(@Args('name') name: string): Promise<Wallet> {
        return await this._walletsService.createWallet(name)
    }

    @Query(() => [Wallet], { name: 'wallets' })
    async wallets(): Promise<Wallet[]> {
        return await this._walletsService.getAllWallets()
    }

    @Query(() => Wallet, { name: 'wallet' })
    async wallet(@Args('name') name: string): Promise<Wallet | undefined> {
        return await this._walletsService.findWallet(name)
    }

    @Mutation(() => Transaction, { name: 'deposit' })
    async deposit(
        @Args('input') input: OperationInput,
    ): Promise<Transaction | null> {
        return await this._walletsService.createOperation(input)
    }

    @Mutation(() => Transaction, { name: 'withdraw' })
    async withdraw(
        @Args('input') input: OperationInput,
    ): Promise<Transaction | null> {
        return await this._walletsService.createOperation({
            walletName: input.walletName,
            money: -input.money,
        })
    }

    @Mutation(() => Boolean, { name: 'close' })
    async close(@Args('name') name: string): Promise<boolean> {
        return await this._walletsService.closeWallet(name)
    }
}
