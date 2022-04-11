import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('wallets')
export class WalletEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column()
    cash: string
}
