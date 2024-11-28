import mongoose from "mongoose";
import Students from "./studentsModel.mjs";

class StudentsService {
  static async getListST() {
    try {
      const students = await mongoose.model('Students').find().populate('course');
      return students;
    } catch (error) {
      console.error('Error while getting students list:', error);
      return [];
    }
  }

  static async update(id, data) { 
    try {
      console.log('data', data);
      await Students.findByIdAndUpdate(id, data);
    } catch (error) {
      console.error('Error while updating student:', error);
      throw new Error('Error updating student');
    }
  }

  static async create(data) {
    try {
      const newStudent = new Students(data);
      await newStudent.save();
      return newStudent;
    } catch (error) {
      console.error('Error while creating new student:', error);
      throw new Error('Error creating new student');
    }
  }

  static async getById(id) {
    try {
      const student = await Students.findById(id).populate('course').exec();
      if (!student) {
        throw new Error(`Course with id ${id} not found`);
      }
      return student;
    } catch (error) {
      throw Error('Error get student by id');
    }
  }

  static async delete(id) {
    try {
      await Students.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error while deleting student:', error);
      throw new Error('Error deleting student');
    }
  }
}

export default StudentsService;