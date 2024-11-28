import express from "express";
import mainRouter from './mainrouter.mjs';
import studentsRouter from './students.mjs';
import courseRouter from './courses.mjs';

const router = express.Router()

router.use('/', mainRouter)
router.use('/students', studentsRouter)
router.use('/courses', courseRouter)

export default router
