import express from "express";
import ControllerCs from "../controller/coursesController.mjs";
import ValidateSchemCours from "../validate/validateCourse.mjs";

const router = express.Router();

router.get('/', ControllerCs.getCoursesList);

router.get('/add/:id?', ControllerCs.getCreateForm);

router.post('/add/:id?',ValidateSchemCours.validateCours ,ControllerCs.addCourse);

router.delete('/:id', ControllerCs.deletCours)

export default router;
