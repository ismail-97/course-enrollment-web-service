const coursesRouter = require('express').Router()
const { authorize } = require('../middlwares')
const { Course } = require('../models/index')
const {
  validateNewCourseInputs,
  validateEditCourseInputs,
} = require('../middlwares')
/*
- Admin have full access to all courses.
- Instructor see his courses.
- Student see published courses with limited access.
*/
coursesRouter.get('/', async (req, res) => {
  const role = req.user.role

  // Admin have full access to all courses.
  if (role === 'admin') {
    const courses = await Course.findAll()

    return res.status(200).json(courses)
  }

  // Instructor see his own courses.
  if (role === 'instructor') {
    const courses = await Course.findAll({
      where: { instructorId: req.user.id },
    })

    return res.status(200).json(courses)
  }

  // Student see only published courses with limited access.
  if (role === 'student') {
    const courses = await Course.findAll({
      where: { is_published: true },
      attributes: {
        exclude: ['is_published', 'content', 'instructorId'],
      },
    })
    return res.status(200).json(courses)
  }
})

coursesRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  // check if course exist
  const course = await Course.findByPk(id)

  // if not exist, return not found error
  if (!course) {
    return res.status(404).json({ message: `No course with id ${id}` })
  }

  const role = req.user.role

  if (role === 'admin') {
    // Admin have full access
    return res.status(200).json(course)
  }

  // Instructor see his own courses only.
  if (role === 'instructor') {
    if (course.instructorId !== req.user.id) {
      return res.status(403).json({
        message: 'Access denied: instructor see his own courses only.',
      })
    }
    return res.status(200).json(course)
  }

  // Student see only published courses with limited access.
  if (role === 'student') {
    if (!course.is_published) {
      return res.status(403).json({
        message: 'Access denied: student see published courses only.',
      })
    }
    const { id, price, title, description } = course
    const allowedFields = { id, price, title, description }
    return res.status(200).json(allowedFields)
  }
})

coursesRouter.post(
  '',
  [authorize('instructor'), validateNewCourseInputs],
  async (req, res) => {
    const { title, description, price, is_published, content } = req.body
    const course = {
      title,
      description,
      price,
      is_published,
      content,
      instructorId: req.user.id,
    }

    //create new course
    const newCourse = await Course.create(course)
    return res.json(newCourse)
  }
)

coursesRouter.put(
  '/:id',
  [authorize('instructor'), validateEditCourseInputs],
  async (req, res) => {
    const id = Number(req.params.id)

    // check if course exist
    const course = await Course.findByPk(id)

    // if not exist, return not found error
    if (!course) {
      return res.status(404).json({ message: `No course with id ${id}` })
    }

    // else update course
    await course.update(req.body)

    res.status(200).json({ message: 'course updated successfully', course })
  }
)

coursesRouter.delete('/:id', authorize('admin'), async (req, res) => {
  const id = Number(req.params.id)

  // check for user if exist
  const course = await Course.findByPk(id)

  // if not exist, return not found error
  if (!course) {
    return res.status(404).json({ message: `No course with id ${id}` })
  }

  // else delete
  await course.destroy()

  res.status(200).json({ message: 'course deleted successfully' })
})

module.exports = coursesRouter
