import { NotFoundException } from '@nestjs/common'
import { FindOneOptions, ObjectID, ObjectLiteral, Repository } from 'typeorm'

const getEntityName = (tableName: string): string =>
    tableName.charAt(0).toUpperCase() +
    tableName.slice(
        1,
        tableName.charAt(tableName.length - 1) === 's'
            ? tableName.length - 1
            : undefined,
    )

export async function repositoryFindOne<T extends ObjectLiteral>(
    repository: Repository<T>,
    options: FindOneOptions<T> | string | number | Date | ObjectID | undefined,
): Promise<T> {
    const findedEntity = await repository.findOne(options as undefined)

    if (!findedEntity) {
        throw new NotFoundException(
            `${getEntityName(repository.metadata.tableName)} Not Found`,
        )
    }

    return findedEntity
}
