import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import BigNumber from 'bignumber.js'
import { Repository } from 'typeorm'

import { Transaction } from '../Transactions/transactions.entity'
import { TransactionsService } from '../Transactions/transactions.service'

import { OperationInput, Wallet } from './wallets.entity'

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly _walletRepository: Repository<Wallet>,
        private readonly _transactionsService: TransactionsService,
    ) {}

    async createWallet(name: Wallet['name']): Promise<Wallet> {
        return await this._walletRepository.save(
            this._walletRepository.create({
                name,
                money: 0,
            }),
        )
    }

    async getAllWallets(): Promise<Wallet[]> {
        return await this._walletRepository.find().then((data) => data)
    }

    async findWallet(name: Wallet['name']): Promise<Wallet | undefined> {
        return await this._walletRepository
            .findOne({ where: { name } })
            .then((data) => data)
    }

    async createOperation(input: OperationInput): Promise<Transaction | null> {
        const findedWallet = await this._walletRepository.findOne({
            where: { name: input.walletName },
        })

        if (!findedWallet) {
            return null
        }

        const transaction = await this._transactionsService.createTransaction(
            input.money,
        )

        ;(await findedWallet.transactions).push(transaction)

        await this._walletRepository.save({
            ...findedWallet,
            money: new BigNumber(findedWallet.money)
                .plus(input.money)
                .toNumber(),
        })

        return transaction
    }

    async closeWallet(name: Wallet['name']): Promise<boolean> {
        const findedWallet = await this._walletRepository.findOne({
            where: { name },
        })

        if (!findedWallet) {
            return false
        }

        await this._walletRepository.softDelete(findedWallet)

        return true
    }
}
