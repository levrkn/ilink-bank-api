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

    async createWallet(name: string): Promise<WalletEntity> {
        return await this._walletRepository.save(
            this._walletRepository.create({ name, cash: '0' }),
        )
    }

    async getAllWallets(): Promise<WalletEntity[]> {
        return await this._walletRepository.find().then((data) => data)
    }
}
