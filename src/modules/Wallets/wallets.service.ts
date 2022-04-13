import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { WalletEntity } from './wallets.entity'

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly _walletRepository: Repository<WalletEntity>,
    ) {}

    async createWallet(name: WalletEntity['name']): Promise<WalletEntity> {
        return await this._walletRepository.save(
            this._walletRepository.create({ name, money: 0 }),
        )
    }

    async getAllWallets(): Promise<WalletEntity[]> {
        return await this._walletRepository.find().then((data) => data)
    }

    async findWallet(
        name: WalletEntity['name'],
    ): Promise<WalletEntity | undefined> {
        return await this._walletRepository
            .findOne({ where: { name } })
            .then((data) => data)
    }
}
