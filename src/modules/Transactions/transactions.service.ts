import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TransactionEntity } from './transactions.entity'

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly _transactionRepository: Repository<TransactionEntity>,
    ) {}

    async createTransaction(args: {
        money: TransactionEntity['money']
        from: TransactionEntity['from']
        to: TransactionEntity['to']
    }): Promise<TransactionEntity> {
        return await this._transactionRepository.save(
            this._transactionRepository.create({ ...args }),
        )
    }

    async getAllTransactions(): Promise<TransactionEntity[]> {
        return await this._transactionRepository.find().then((data) => data)
    }

    async findTransaction(
        id: TransactionEntity['id'],
    ): Promise<TransactionEntity | undefined> {
        return await this._transactionRepository
            .findOne({ where: { id } })
            .then((data) => data)
    }
}
