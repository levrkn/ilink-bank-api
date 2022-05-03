import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionsModule } from '../Transactions/transactions.module'
import { UsersModule } from '../Users/users.module'

import { WalletEntity } from './entities/wallet.entity'
import { WalletsResolver } from './wallets.resolver'
import { WalletsService } from './wallets.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletEntity]),
        forwardRef(() => TransactionsModule),
        forwardRef(() => UsersModule),
    ],
    providers: [WalletsService, WalletsResolver],
    exports: [WalletsService],
})
export class WalletsModule {}
