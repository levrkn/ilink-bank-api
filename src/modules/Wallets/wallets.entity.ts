import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { TransactionEntity } from '../Transactions/transactions.entity'

@Entity('wallets')
export class WalletEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column()
    money: number

    @OneToMany(() => TransactionEntity, (transaction) => transaction.from)
    transactions: TransactionEntity
}
