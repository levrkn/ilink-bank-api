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

    @ManyToOne(() => WalletEntity, (wallet) => wallet.sendedTransactions, {
        nullable: true,
    })
    senderWallet?: WalletEntity

    @ManyToOne(() => WalletEntity, (wallet) => wallet.recievedTransactions, {
        nullable: true,
    })
    recieverWallet?: WalletEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
