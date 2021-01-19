const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
const User = require('../models').User;

const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

router.get('/', asyncHandler( async (req, res) => {
   const courses = await Course.findAll({
      attributes: ['id', 'title', 'description', 'estimatedTime'],
      include: [
         {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
         }
      ]
   });
   res.json({courses});
}));

router.get('/:id', asyncHandler( async (req, res) => {
   const course = await Course.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description', 'estimatedTime'],
      include: [
         {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
         }
      ]
   });
   if(course) {
      res.json(course);
   } else {
      res.status(404).json({
         message: 'course not found'
      })
   }
}));

router.post('/', authenticateUser, asyncHandler( async (req, res) => {
   try {
      await Course.create(req.body);
      res.status(201).end();
   } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
         const errors = error.errors.map(err => err.message);
         res.status(400).json({ errors });
      } else {
         throw error;
      }
   }
}));

router.put('/:id', authenticateUser, asyncHandler( async (req, res) => {
   const course = await Course.findByPk(req.params.id);
   try {
      if (course) {
         const userId = req.currentUser.id;
         const isCourseOwner = course.userId === userId;
         if(isCourseOwner) {
            await course.update(req.body);
            res.status(204).end();
         } else {
            res.status(403).json({
               message: "Access forbidden"
            })
         }
      } else {
         res.status(404).json({
            message: "Course not found"
         })
      }
   } catch(error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
         const errors = error.errors.map(err => err.message);
         res.status(400).json({ errors });
      } else {
         throw error;
      }
   }

}));

router.delete('/:id', authenticateUser, asyncHandler( async (req, res) => {
   const course = await Course.findByPk(req.params.id);
   if(course) {
      const userId = req.currentUser.id;
      const isCourseOwner = course.userId === userId;
      if(isCourseOwner) {
         await course.destroy();
         res.status(204).end();
      } else {
         res.status(403).json({
            message: "Access forbidden"
         })
      }
   } else {
      res.status(404).json({
         msg: "Course not found"
      });
   }
}));

module.exports = router;
