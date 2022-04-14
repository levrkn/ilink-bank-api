import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WalletsModule } from '../Wallets/wallets.module'

import { Transaction } from './transactions.entity'
import { TransactionsResolver } from './transactions.resolver'
import { TransactionsService } from './transactions.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        forwardRef(() => WalletsModule),
    ],
    providers: [TransactionsService, TransactionsResolver],
    exports: [TransactionsService],
})
export class TransactionsModule {}
