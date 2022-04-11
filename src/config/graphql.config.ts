import { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo/dist/drivers'

export const graphQLConfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: true,
}
