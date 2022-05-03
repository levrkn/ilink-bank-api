import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { WalletEntity } from '../Wallets/entities/wallet.entity'

import { TransactionEntity } from './entities/transaction.entity'

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly _transactionRepository: Repository<TransactionEntity>,
    ) {}

    async createTransaction(
        money: number,
        wallet: WalletEntity,
    ): Promise<TransactionEntity> {
        const transaction = new TransactionEntity()
        transaction.money = money
        transaction.wallet = wallet

        return await this._transactionRepository.save(
            this._transactionRepository.create(transaction),
        )
    }

    async getAllTransactions(): Promise<TransactionEntity[]> {
        return await this._transactionRepository.find().then((data) => data)
    }

    async findTransaction(
        id: TransactionEntity['id'],
    ): Promise<TransactionEntity | Error> {
        const findedTransaction = await this._transactionRepository
            .findOne({ where: { id } })
            .then((data) => data)
        return !findedTransaction ? new NotFoundException() : findedTransaction
    }
}
