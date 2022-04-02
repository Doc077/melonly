export default {
  app: {
    name: 'Melonly',
    language: 'en',
  },
  database: {
    connection: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  mail: {
    service: process.env.MAIL_SERVICE,
    address: process.env.MAIL_ADDRESS,
    host: process.env.MAIL_HOST,
    password: process.env.MAIL_PASSWORD,
  },
}
