const User = require('./user')
const Course = require('./course')
const Enrollment = require('./enrollment')
const { sequelize } = require('../util/db')

User.hasMany(Course, { foreignKey: 'instructorId', as: 'instructor' })
Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' })

Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' })
Enrollment.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' })
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })

// instructor may have many enrollments
User.hasMany(Enrollment, {
  foreignKey: 'instructorId',
  as: 'instructorEnrollments',
})

// student may have many enrollments
User.hasMany(Enrollment, {
  foreignKey: 'studentId',
  as: 'studentEnrollments',
})

// same course may be in multiple enrollments
Course.hasMany(Enrollment, {
  foreignKey: 'courseId',
  as: 'courseEnrollments',
})

// individal syncing doesn't work properly, so I used sequelize.sync() instead.
/* 
User.sync({ alter: true })
Course.sync({ alter: true })
Enrollment.sync({ alter: true }) 
*/

sequelize
  .sync({ alter: true })
  .then(() => console.log('All models synced successfully.'))
  .catch(console.error)

module.exports = {
  User,
  Course,
  Enrollment,
}
