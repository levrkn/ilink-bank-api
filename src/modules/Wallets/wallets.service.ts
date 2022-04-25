import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import BigNumber from 'bignumber.js'
import { Repository } from 'typeorm'

import { TransactionEntity } from '../Transactions/entities/transaction.entity'
import { TransactionsService } from '../Transactions/transactions.service'

import { WalletEntity } from './entities/wallet.entity'
import { OperationInputType } from './graphql/operationInput.type'

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly _walletRepository: Repository<WalletEntity>,
        private readonly _transactionsService: TransactionsService,
    ) {}

    async createWallet(): Promise<WalletEntity> {
        return await this._walletRepository.save(
            this._walletRepository.create({
                money: 0,
            }),
        )
    }

    async getAllWallets(): Promise<WalletEntity[]> {
        return await this._walletRepository.find().then((data) => data)
    }

    async findWallet(
        id: WalletEntity['id'],
    ): Promise<WalletEntity | undefined> {
        return await this._walletRepository
            .findOne({ where: { id } })
            .then((data) => data)
    }

    async createOperation(
        input: OperationInputType,
    ): Promise<TransactionEntity | Error> {
        const findedWallet = await this._walletRepository.findOne({
            where: { id: input.id },
        })

        if (!findedWallet) {
            return new NotFoundException()
        }

        const moneySum = new BigNumber(findedWallet.money).plus(input.money)

        if (moneySum.lt(0)) {
            return new Error('not enough money in the account')
        }

        const transaction = await this._transactionsService.createTransaction(
            input.money,
        )

        ;(await findedWallet.transactions).push(transaction)

        await this._walletRepository.save({
            ...findedWallet,
            money: moneySum.toNumber(),
        })

        return transaction
    }

    async closeWallet(id: WalletEntity['id']): Promise<boolean> {
        const findedWallet = await this._walletRepository.findOne({
            where: { id },
        })

        if (!findedWallet) {
            return false
        }

        this._walletRepository.softDelete(findedWallet.id)

        return true
    }
}
