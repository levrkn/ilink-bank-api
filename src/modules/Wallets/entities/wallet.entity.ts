import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { TransactionEntity } from 'src/modules/Transactions/entities/transaction.entity'
import { UserEntity } from 'src/modules/Users/entities/user.entity'

@Entity('wallets')
export class WalletEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    money: number

    @OneToMany(
        () => TransactionEntity,
        (transaction) => transaction.senderWallet,
    )
    sendedTransactions: Promise<TransactionEntity[]>

    @OneToMany(
        () => TransactionEntity,
        (transaction) => transaction.recieverWallet,
    )
    recievedTransactions: Promise<TransactionEntity[]>

    @ManyToOne(() => UserEntity, (user) => user.wallets)
    user?: UserEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
