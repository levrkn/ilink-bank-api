import { ConfigModuleOptions } from '@nestjs/config'

export const config: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
}
