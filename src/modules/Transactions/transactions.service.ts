import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Transaction } from './transactions.entity'

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly _transactionRepository: Repository<Transaction>,
    ) {}

    async createTransaction(money: number): Promise<Transaction> {
        return await this._transactionRepository.save(
            this._transactionRepository.create({
                money,
            }),
        )
    }

    async getAllTransactions(): Promise<Transaction[]> {
        return await this._transactionRepository.find().then((data) => data)
    }

    async findTransaction(
        id: Transaction['id'],
    ): Promise<Transaction | undefined> {
        return await this._transactionRepository
            .findOne({ where: { id } })
            .then((data) => data)
    }
}
