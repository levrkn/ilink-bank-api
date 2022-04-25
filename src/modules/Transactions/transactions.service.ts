import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TransactionEntity } from './entities/transaction.entity'

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly _transactionRepository: Repository<TransactionEntity>,
    ) {}

    async createTransaction(money: number): Promise<TransactionEntity> {
        return await this._transactionRepository.save(
            this._transactionRepository.create({
                money,
            }),
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
