import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { moneySumming } from 'src/lib/moneySumming'
import { repositoryFindOne } from 'src/lib/repositoryFindOne'

import { TransactionEntity } from '../Transactions/entities/transaction.entity'
import { TransactionsService } from '../Transactions/transactions.service'
import { UsersService } from '../Users/users.service'

import { WalletEntity } from './entities/wallet.entity'
import { OperationInputType } from './graphql/operation.input'
import { TransferMoneyType } from './graphql/transferMoney.input'

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly _walletRepository: Repository<WalletEntity>,
        private readonly _transactionsService: TransactionsService,
        private readonly _usersService: UsersService,
    ) {}

    async createWallet(name: string): Promise<WalletEntity> {
        const findedUser = await this._usersService.findUser(name)
        const wallet = new WalletEntity()
        wallet.money = 0
        wallet.user = findedUser

        const savedWallet = await this._walletRepository.save(
            this._walletRepository.create(wallet),
        )

        return savedWallet
    }

    async getAllWallets(): Promise<WalletEntity[]> {
        return await this._walletRepository.find().then((data) => data)
    }

    async findWallet(id: WalletEntity['id']): Promise<WalletEntity> {
        return await repositoryFindOne(this._walletRepository, id)
    }

    async createOperation(
        input: OperationInputType,
    ): Promise<TransactionEntity> {
        const findedWallet = await repositoryFindOne(
            this._walletRepository,
            input.id,
        )
        findedWallet.money = moneySumming(findedWallet.money, input.money)
        await this._walletRepository.save(findedWallet)

        return await this._transactionsService.createTransaction(input.money, {
            reciever: findedWallet,
        })
    }

    async closeWallet(id: WalletEntity['id']): Promise<WalletEntity> {
        const findedWallet = await repositoryFindOne(this._walletRepository, id)
        this._walletRepository.softDelete(findedWallet.id)

        return findedWallet
    }

    async transferMoney(input: TransferMoneyType): Promise<TransactionEntity> {
        const findedSenderWallet = await repositoryFindOne(
            this._walletRepository,
            input.senderWalletId,
        )
        const findedRecieverWallet = await repositoryFindOne(
            this._walletRepository,
            input.recieverWalletId,
        )
        findedSenderWallet.money = moneySumming(
            findedSenderWallet.money,
            -input.money,
        )
        findedRecieverWallet.money = moneySumming(
            findedRecieverWallet.money,
            input.money,
        )
        await this._walletRepository.save(findedSenderWallet)
        await this._walletRepository.save(findedRecieverWallet)

        return await this._transactionsService.createTransaction(input.money, {
            sender: findedSenderWallet,
            reciever: findedRecieverWallet,
        })
    }
}
