import { Schema, SchemaType as Type } from '@melonly/core'

export default {
  setup: (schema: Schema): void => {
    schema.createTable('users', {
      id: Type.Id,
      name: Type.String,
      email: Type.String,
      password: Type.String,
      createdAt: Type.DateTime,
    })
  },
  rollback: (schema: Schema): void => {
    schema.dropTable('users')
  },
}
