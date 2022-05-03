import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class OperationInputType {
    @Field()
    id: string

    @Field()
    money: number
}
