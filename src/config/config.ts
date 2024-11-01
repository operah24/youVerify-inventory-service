export default {
  port: process.env.PORT || 3002,
  dbUrl: {
    dev: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&authSource=admin`,
  },
  amqpSettings: {
    protocol: 'amqp',
    hostname: process.env.RMQ_HOST,
    port: process.env.RMQ_PORT ?? "",
    username: process.env.RMQ_USER,
    password: process.env.RMQ_PASS,
    connectionString: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`,
   
  },
}