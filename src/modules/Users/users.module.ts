import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from 'src/modules/Users/entities/user.entity'

import { WalletsModule } from '../Wallets/wallets.module'

import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => WalletsModule),
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
