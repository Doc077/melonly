import { Schema } from '@melonly/core'

export async function up(schema: Schema): Promise<void> {
    schema.createTable('users', {
        id: 'id',
        name: 'string',
        email: 'string',
        password: 'string',
        createdAt: 'datetime',
    })
}
