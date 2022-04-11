import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class WalletModel {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    cash: string
}
