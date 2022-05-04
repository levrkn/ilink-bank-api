import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { repositoryFindOne } from 'src/lib/repositoryFindOne'

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
        wallets: { sender?: WalletEntity; reciever: WalletEntity },
    ): Promise<TransactionEntity> {
        const transaction = new TransactionEntity()
        transaction.money = money
        transaction.recieverWallet = wallets.reciever
        transaction.senderWallet = wallets.sender

        return await this._transactionRepository.save(
            this._transactionRepository.create(transaction),
        )
    }

    async getAllTransactions(): Promise<TransactionEntity[]> {
        return await this._transactionRepository.find().then((data) => data)
    }

    async findTransaction(
        id: TransactionEntity['id'],
    ): Promise<TransactionEntity> {
        return await repositoryFindOne(this._transactionRepository, id)
    }
}
