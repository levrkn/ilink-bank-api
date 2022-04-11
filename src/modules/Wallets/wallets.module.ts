import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WalletEntity } from './wallets.entity'
import { WalletsResolver } from './wallets.resolver'
import { WalletsService } from './wallets.service'

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    providers: [WalletsService, WalletsResolver],
})
export class WalletsModule {}
