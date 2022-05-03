import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserType {
    @Field()
    name: string

    @Field()
    email: string
}
