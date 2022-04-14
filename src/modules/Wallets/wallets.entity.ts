import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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
}

@InputType()
export class OperationInput {
    @Field()
    money: number

    @Field()
    walletName: string
}
