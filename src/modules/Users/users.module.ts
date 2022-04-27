import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from 'src/modules/Users/entities/user.entity'

import { TransactionsModule } from '../Transactions/transactions.module'

import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => TransactionsModule),
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class WalletsModule {}
