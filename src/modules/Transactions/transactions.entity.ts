import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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
}
