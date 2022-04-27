import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserEntity } from './entities/user.entity'
import { CreateUserType } from './graphql/createUser.type'
import { UserType } from './graphql/user.type'
import { UsersService } from './users.service'

@Resolver(() => [UserType])
export class UsersResolver {
    constructor(private readonly _usersService: UsersService) {}

    @Mutation(() => UserType, { name: 'createUser' })
    async createUser(
        @Args('input') input: CreateUserType,
    ): Promise<UserEntity> {
        return await this._usersService.createUser(input)
    }

    @Query(() => [UserType], { name: 'users' })
    async users(): Promise<UserEntity[]> {
        return await this._usersService.getAllUsers()
    }

    @Query(() => UserType, { name: 'user' })
    async user(@Args('id') id: string): Promise<UserEntity | Error> {
        return await this._usersService.findUser(id)
    }
}
