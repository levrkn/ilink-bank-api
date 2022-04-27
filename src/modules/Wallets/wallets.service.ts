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

    async createWallet(name: string): Promise<WalletEntity> {
        const findedUser = this._walletRepository.findOne({ where: name })
        return await this._walletRepository.save(
            this._walletRepository.create({
                money: 0,
                user: findedUser,
            }),
        )
    }

    async getAllWallets(): Promise<WalletEntity[]> {
        return await this._walletRepository.find().then((data) => data)
    }

    async findWallet(id: WalletEntity['id']): Promise<WalletEntity | Error> {
        const findedWallet = await this._walletRepository
            .findOne({ where: { id } })
            .then((data) => data)
        return !findedWallet ? new NotFoundException() : findedWallet
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

    // async transferMoney(
    //     resenderWalletId: string,
    //     recieverWalletId: string,
    //     money: number,
    // ): Promise<boolean> {
    // const result = {
    //     sender: this.createOperation({
    //         id: resenderWalletId,
    //         money: -money,
    //     }),
    //     reciever: this.createOperation({ id: recieverWalletId, money }),
    // }

    // if (result.sender.then((data) => data)) {
    //     return false
    // }

    // this._walletRepository.softDelete(findedWallet.id)

    //     return true
    // }
}
