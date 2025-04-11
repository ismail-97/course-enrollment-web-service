const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

console.log('connecting to postgresql database ...')

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the database')
  } catch (error) {
    console.log('Unable to connect to the provided database URL', error)
  }
}

module.exports = { sequelize, connectToDatabase }
