import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { moneyValidation } from 'src/lib/moneyValidation'

import { TransactionEntity } from '../Transactions/entities/transaction.entity'
import { TransactionType } from '../Transactions/graphql/transaction.type'

import { WalletEntity } from './entities/wallet.entity'
import { OperationInputType } from './graphql/operation.input'
import { TransferMoneyType } from './graphql/transferMoney.input'
import { WalletType } from './graphql/wallet.type'
import { WalletsService } from './wallets.service'

@Resolver(() => [WalletType])
export class WalletsResolver {
    constructor(private readonly _walletsService: WalletsService) {}

    @Mutation(() => WalletType, { name: 'createWallet' })
    async createWallet(
        @Args('userName') userName: string,
    ): Promise<WalletEntity> {
        return await this._walletsService.createWallet(userName)
    }

    @Mutation(() => TransactionType, { name: 'deposit' })
    async deposit(
        @Args('input') input: OperationInputType,
    ): Promise<TransactionEntity> {
        moneyValidation(input.money)
        return await this._walletsService.createOperation(input)
    }

    @Mutation(() => TransactionType, { name: 'withdraw' })
    async withdraw(
        @Args('input') input: OperationInputType,
    ): Promise<TransactionEntity> {
        moneyValidation(input.money)
        return await this._walletsService.createOperation({
            id: input.id,
            money: -input.money,
        })
    }

    @Mutation(() => TransactionType, { name: 'transfer' })
    async transfer(
        @Args('input') input: TransferMoneyType,
    ): Promise<TransactionEntity> {
        moneyValidation(input.money)
        return await this._walletsService.transferMoney(input)
    }

    @Mutation(() => WalletType, { name: 'closeWallet' })
    async closeWallet(@Args('id') id: string): Promise<WalletEntity> {
        return await this._walletsService.closeWallet(id)
    }

    @Query(() => [WalletType], { name: 'wallets' })
    async wallets(): Promise<WalletEntity[]> {
        return await this._walletsService.getAllWallets()
    }

    @Query(() => WalletType, { name: 'wallet' })
    async wallet(@Args('id') id: string): Promise<WalletEntity> {
        return await this._walletsService.findWallet(id)
    }
}
