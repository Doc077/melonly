const { env } = process

export default {
  app: {
    name: 'Melonly',

    language: 'en',

    debug: env.APP_DEBUG,

    key: env.APP_KEY,

    port: env.APP_PORT,
  },

  database: {
    connection: env.DB_CONNECTION,

    host: env.DB_HOST,

    name: env.DB_DATABASE,

    username: env.DB_USERNAME,

    password: env.DB_PASSWORD,
  },

  mail: {
    service: env.MAIL_SERVICE,

    address: env.MAIL_ADDRESS,

    host: env.MAIL_HOST,

    password: env.MAIL_PASSWORD,
  },
}
