import { Field, ObjectType } from '@nestjs/graphql'
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { Wallet } from '../Wallets/wallets.entity'

@Entity('transactions')
@ObjectType()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string

    @Column()
    @Field()
    money: number

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
    @Field(() => Wallet)
    wallet: Promise<Wallet>

    @CreateDateColumn()
    @Field()
    createdAt: Date

    @UpdateDateColumn()
    @Field()
    updatedAt: Date
}
