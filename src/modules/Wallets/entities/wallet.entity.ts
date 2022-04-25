import { ObjectType } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { TransactionEntity } from 'src/modules/Transactions/entities/transaction.entity'

@Entity('wallets')
@ObjectType()
export class WalletEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    money: number

    @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet)
    transactions: Promise<TransactionEntity[]>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
