import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { repositoryFindOne } from 'src/lib/repositoryFindOne'

import { UserEntity } from './entities/user.entity'
import { CreateUserType } from './graphql/createUser.input'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>,
    ) {}

    async createUser(input: CreateUserType): Promise<UserEntity> {
        return await this._userRepository.save(
            this._userRepository.create(input),
        )
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this._userRepository.find().then((data) => data)
    }

    async findUser(name: string): Promise<UserEntity> {
        return await repositoryFindOne(this._userRepository, {
            where: { name },
        })
    }

    async deleteUser(id: string): Promise<UserEntity> {
        const findedUser = await repositoryFindOne(this._userRepository, id)

        this._userRepository.softDelete(findedUser.id)

        return findedUser
    }
}
