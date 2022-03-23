import { Schema, SchemaType } from '@melonly/core'

export const setup = (schema: Schema): void => {
  schema.createTable('users', {
    id: SchemaType.Id,
    name: SchemaType.String,
    email: SchemaType.String,
    password: SchemaType.String,
    createdAt: SchemaType.DateTime,
  })
}

export const rollback = (schema: Schema): void => {
  schema.dropTable('users')
}
