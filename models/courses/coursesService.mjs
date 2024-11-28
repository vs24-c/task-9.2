import mongoose from "mongoose";
import Courses from "./coursesModel.mjs";
import Students from "../student/studentsModel.mjs";


class CoursesService{
  static async getList() {
    try {
      const exist = await Courses.checkExistDb
      if (exist) {
        const courses = await mongoose.model('Courses').find().exec();
        return courses;
      }
    } catch (error) {
      console.error("Error while getting courses list:", error);
      return [];
    }
  }

  static async create(course) {      
    try {
      const newCours = new Courses(course)
      await newCours.save();
    } catch (error) {
      throw Error('Error creat new course');      
    }
  } 

  static async getById(id) { 
    try {
      const course = await Courses.findById(id).exec();
      if (!course) {
        throw new Error(`Course with id ${id} not found`);
      }
      return course;
    } catch (error) {
      throw Error('Error get course by id');
    }
  }

  static async update(id, data) { 
    try {         
      await Courses.findByIdAndUpdate(id, data)      
    } catch (error) {
      throw new Error('Error update courses service')
    }
  }

  static async delete(id) { 
    try {      
      await Courses.findByIdAndDelete(id);
      await Students.updateMany(
          {course: id},
          {
            $pull: {course: id},
            $unset: {seminar_title: '', seminar_time: ''}, 
          }
        );
    } catch (error) {
      throw new Error('Error delete course by id');
    }
  }
}

export default CoursesService;