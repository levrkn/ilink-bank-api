import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { Transaction } from '../Transactions/transactions.entity'

@Entity('wallets')
@ObjectType()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string

    @Column({ unique: true })
    @Field()
    name: string

    @Column()
    @Field()
    money: number

    @OneToMany(() => Transaction, (transaction) => transaction.wallet)
    @Field(() => [Transaction])
    transactions: Promise<Transaction[]>

    @CreateDateColumn()
    @Field()
    createdAt: Date

    @UpdateDateColumn()
    @Field()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}

@InputType()
export class OperationInput {
    @Field()
    money: number

    @Field()
    walletName: string
}
