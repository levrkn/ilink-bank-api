import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { WalletEntity } from '../Wallets/wallets.entity'

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    money: number

    @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions)
    from: WalletEntity

    @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions)
    to: WalletEntity
}
