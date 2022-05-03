import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { graphQLConfig } from './config/graphql.config'
import { typeOrmConfig } from './config/typeorm.config'
import { TransactionsModule } from './modules/Transactions/transactions.module'
import { UsersModule } from './modules/Users/users.module'
import { WalletsModule } from './modules/Wallets/wallets.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        GraphQLModule.forRoot(graphQLConfig),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        TransactionsModule,
        WalletsModule,
        UsersModule,
    ],
})
export class AppModule {}
