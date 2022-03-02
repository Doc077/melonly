export async function up(schema: any): Promise<void> {
    schema.createTable('users', {
        id: 'id',
        name: 'string',
        email: 'string',
        password: 'string',
        created_at: 'date',
    })
}
