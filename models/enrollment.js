const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Enrollment extends Model {}
Enrollment.init(
  {
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'enrollment',
  }
)
module.exports = Enrollment
