import StudentsService from "../models/student/studentsService.mjs";
import CoursesService from "../models/courses/coursesService.mjs";
import { validationResult } from "express-validator";

class StudentsController {

  static async getStudentsList(req, res) {    
    try {
      const students = await StudentsService.getListST();      
      return res.render('students', {
        students: students,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

  static async addStudentForm(req, res) {
    try {
      const id = req.params.id;
      let student = null;
      if (id) {
        student = await StudentsService.getById(id);
      }
      const courses = await CoursesService.getList();
      courses.lenght === 0 ? (courses = null) : courses;    
      res.render('addStudent', {
        errors: [],
        student: student,
        courses: courses,
      });
    } catch (error) {
      throw new Error('Error show add/creat form student');
    }
  }

  static async addStudent(req, res) {
    try {
          const errors = validationResult(req);
      const objStud = req.body;
      
      
          if (!errors.isEmpty()) {
            if (req.params.id) objStud.id = req.params.id;
            return res.render('addStudent', {
              errors: errors.array(),
              student: objStud,
              courses: objStud.course
            });
          }
      let isLector = false; 
      const { name, surname, age, rating, course, seminar_time, seminar_title, rol } = req.body;
      if (req.params.id) {
        await StudentsService.update(req.params.id, {
          name,
          surname,
          age,
          rating,
          course,
          seminar_time,
          seminar_title,
          rol,
        });
      } else {
        if (rol) {
          req.session.rol = rol;
          isLector = req.session.rol === 'lect';
        }
        const student = { name, surname, age, rating, course, isLector };
        if (isLector) {
          student.seminar_title = seminar_title || null;
          student.seminar_time = seminar_time || null;
        }                
        await StudentsService.create(student);
      }
      res.redirect('/courses');
    } catch (error) {
      console.error('Error creating student:', error.message);
      res.status(500).send('Error creating student');
    }
  }

  static async getStudentShow(req, res) {
    try {
      if (!req.params.id) {
        res.redirect('/students')
      }
      const id = req.params.id
      const student = await StudentsService.getById(id)  
      res.render('student', { student });
    } catch (error) {
      
    }
  }

  static async deletStud(req, res) {
    try {
      const { id } = req.params 
      await StudentsService.delete(id);
      res.status(200).json({message: 'Student deleted successfully'});
      // return res.redirect('/students');
    } catch (error) {
      console.error('Error deleting student:', error.message);
      res.status(500).send('Error deleting student');
    }
  }
}

export default StudentsController;