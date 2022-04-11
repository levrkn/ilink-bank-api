import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { WalletEntity } from './wallets.entity'
import { WalletModel } from './wallets.model'
import { WalletsService } from './wallets.service'

@Resolver(() => [WalletModel])
export class WalletsResolver {
    constructor(private readonly _walletsService: WalletsService) {}

    @Mutation(() => WalletModel, { name: 'create' })
    async create(@Args('name') name: string): Promise<WalletEntity> {
        return await this._walletsService.createWallet(name)
    }

    @Query(() => [WalletModel], { name: 'wallets' })
    async wallets(): Promise<WalletEntity[]> {
        return await this._walletsService.getAllWallets()
    }
}
