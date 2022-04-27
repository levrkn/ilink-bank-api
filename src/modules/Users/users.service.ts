import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'
import { CreateUserType } from './graphql/createUser.type'

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

    async findUser(name: string): Promise<UserEntity | Error> {
        const findedUser = await this._userRepository
            .findOne({ where: { name } })
            .then((data) => data)
        return !findedUser ? new NotFoundException() : findedUser
    }

    async deleteUser(id: string): Promise<boolean> {
        const findedUser = await this._userRepository.findOne({
            where: { id },
        })

        if (!findedUser) {
            return false
        }

        this._userRepository.softDelete(findedUser.id)

        return true
    }
}
