import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Transaction } from '../Transactions/transactions.entity'

import { DepositInput, Wallet } from './wallets.entity'
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
    async deposit(@Args('input') input: DepositInput): Promise<Transaction> {
        return await this._walletsService.depositWallet(input)
    }
}
