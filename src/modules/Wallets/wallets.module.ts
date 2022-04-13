import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionsModule } from '../Transactions/transactions.module'

import { Wallet } from './wallets.entity'
import { WalletsResolver } from './wallets.resolver'
import { WalletsService } from './wallets.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
        forwardRef(() => TransactionsModule),
    ],
    providers: [WalletsService, WalletsResolver],
    exports: [WalletsService],
})
export class WalletsModule {}
