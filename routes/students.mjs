import express from 'express';
import ControllerSt from '../controller/studentsController.mjs'
import ValidateSchemStudent from '../validate/validateStudent.mjs';


const router = express.Router();

router.post('/add/:id?', ValidateSchemStudent.studentValidationRules, ControllerSt.addStudent);

router.get('/add/:id?', ControllerSt.addStudentForm)

router.get('/:id', ControllerSt.getStudentShow)

router.get('/', ControllerSt.getStudentsList);

router.delete('/:id', ControllerSt.deletStud)


export default router;
