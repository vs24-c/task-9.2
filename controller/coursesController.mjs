import CoursesService from "../models/courses/coursesService.mjs";
import StudentsService from "../models/student/studentsService.mjs";
import { validationResult } from "express-validator";

class CoursesController {
  static async getCoursesList(req, res) {    
    try {
      const students = await StudentsService.getListST();
      const courses = await CoursesService.getList();        
      return res.render('courses', {
        courses: courses,
        students: students,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message});
    }
  }

  static async getCreateForm(req, res) {
    try {
      const id = req.params.id;      
      let course = null;
      if (id) {
        course = await CoursesService.getById(id);
      }
      return res.render('addCourse', {
        errors: [],
        course: course,
      });
    } catch (error) {
      throw new Error('Error show add/creat form courses');
    }
  }

  static async addCourse(req, res) {
    console.log('------------------------------');
    console.log(req.body);
    
    try {     
      const errors = validationResult(req)
      const objCours = req.body
      
      if (!errors.isEmpty()) {
        if (req.params.id) objCours.id = req.params.id
        return res.render('addCourse', {
          errors: errors.array(),
          course: objCours,
        });
      }


      const {title, time} = req.body
      if (req.params.id) {        
        await CoursesService.update(req.params.id, {title, time});
      } else {
        await CoursesService.create({ title, time});        
      }
      return res.redirect('/courses');
    } catch (error) {
      console.log(error);
      return res.status(400).json({error: error.message});
    }
  }

  static async deletCours(req, res) { 
    try {
      const {id} = req.params
      await CoursesService.delete(id);
      res.status(200).json({message: 'Student deleted successfully'});
      // return res.redirect('/courses');
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message});
    }
  }
}

export default CoursesController;