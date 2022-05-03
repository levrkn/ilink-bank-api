import { schemas } from './schemas'

export type SchemasType = 'createUser' | 'createWallet' | 'deposit' | 'transfer'

export const getSchema = (name: SchemasType): string =>
    schemas()[name]?.loc?.source.body || ''
