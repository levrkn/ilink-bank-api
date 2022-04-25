import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WalletsModule } from '../Wallets/wallets.module'

import { TransactionEntity } from './entities/transaction.entity'
import { TransactionsResolver } from './transactions.resolver'
import { TransactionsService } from './transactions.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionEntity]),
        forwardRef(() => WalletsModule),
    ],
    providers: [TransactionsService, TransactionsResolver],
    exports: [TransactionsService],
})
export class TransactionsModule {}
