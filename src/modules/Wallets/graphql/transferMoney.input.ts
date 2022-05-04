import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TransferMoneyType {
    @Field()
    money: number

    @Field()
    senderWalletId: string

    @Field()
    recieverWalletId: string
}
