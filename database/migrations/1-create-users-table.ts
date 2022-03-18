import { Schema, SchemaType } from '@melonly/core'

export const setup = async (schema: Schema): Promise<void> => {
    schema.createTable('users', {
        id: SchemaType.Id,
        name: SchemaType.String,
        email: SchemaType.String,
        password: SchemaType.String,
        createdAt: SchemaType.DateTime,
    })
}
