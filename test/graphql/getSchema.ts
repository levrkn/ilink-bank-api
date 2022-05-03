import { schemas } from './schemas'

type SchemasType = 'createUser' | 'createWallet' | 'deposit'

export const getSchema = (name: SchemasType): string =>
    schemas()[name]?.loc?.source.body || ''
