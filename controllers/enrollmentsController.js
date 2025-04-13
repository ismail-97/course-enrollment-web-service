const { authorize } = require('../middlwares')
const { Course, Enrollment, User } = require('../models')
const { validateEnrollmentInput } = require('../middlwares')
const enrollmentRouter = require('express').Router()

enrollmentRouter.get('/', authorize('student'), async (req, res) => {
  try {
    // student can see all details of the courses they are enrolled in
    const courses = await Course.findAll({
      attributes: { exclude: ['instructorId'] },
      // join course & enrollment & user tables
      include: [
        {
          model: Enrollment,
          as: 'courseEnrollments',
          attributes: [],
          where: {
            studentId: req.user.id,
          },
        },
        {
          model: User,
          as: 'instructor',
          attributes: ['name'],
        },
      ],
    })
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error })
  }
})

enrollmentRouter.post(
  '/',
  [authorize('instructor'), validateEnrollmentInput],
  async (req, res) => {
    const { courseId, email } = req.body

    try {
      //check if course exist
      const course = await Course.findOne({
        where: { id: courseId, instructorId: req.user.id },
        raw: true,
      })

      // if not exist, return not found error
      if (!course) {
        return res
          .status(404)
          .json({ message: `No course found with id ${courseId}` })
      }

      // if not published return error
      if (!course.is_published) {
        return res.status(400).json({
          message: `you cannot enroll students into unpublished courses`,
        })
      }
      // check is user exist and if he is a student.
      const student = await User.findOne({
        where: { email, role: 'student' },
        raw: true,
      })

      // if not exist, return not found error
      if (!student) {
        return res
          .status(404)
          .json({ message: `No student found with email ${email}` })
      }

      // check if student is already enrolled
      const isEnrolled = await Enrollment.findOne({
        where: {
          courseId,
          studentId: student.id,
        },
      })

      if (isEnrolled) {
        return res.status(400).json({
          message: `the student with email: ${email} is already enrolled in course with id ${course.id}`,
        })
      }

      const enrollment = {
        courseId,
        studentId: student.id,
        instructorId: req.user.id,
      }
      //create new enrollment
      const newEnrollment = await Enrollment.create(enrollment)
      res.status(201).json(newEnrollment)
    } catch (error) {
      res.status(500).json({ message: 'server error', error: error })
    }
  }
)

enrollmentRouter.delete(
  '/',
  [authorize('instructor'), validateEnrollmentInput],
  async (req, res) => {
    const { courseId, email } = req.body

    try {
      // check is user exist and if he is a student.
      const student = await User.findOne({
        where: { email, role: 'student' },
        raw: true,
      })

      // if not exist, return not found error
      if (!student) {
        return res
          .status(404)
          .json({ message: `No student found with email ${email}` })
      }

      // check if enrollment exist
      const enrollment = await Enrollment.findOne({
        where: {
          courseId,
          studentId: student.id,
        },
      })

      // if not exist, return not found error
      if (!enrollment) {
        return res.status(404).json({
          message: `No enrollment with email: ${email} and course id: ${courseId}`,
        })
      }

      // else delete
      await enrollment.destroy()
      res.status(200).json({ message: 'enrollment deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: 'server error', error: error.name })
    }
  }
)

module.exports = enrollmentRouter
