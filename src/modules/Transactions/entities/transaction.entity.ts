import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { WalletEntity } from 'src/modules/Wallets/entities/wallet.entity'

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    money: number

    @Column({ nullable: true })
    fromWalletId: string

    @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions)
    wallet: WalletEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
