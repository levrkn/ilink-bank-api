import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { WalletEntity } from 'src/modules/Wallets/entities/wallet.entity'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ unique: true })
    name: string

    @Column({ unique: true })
    email: string

    @OneToMany(() => WalletEntity, (wallet) => wallet.user)
    wallets: Promise<WalletEntity[]>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
