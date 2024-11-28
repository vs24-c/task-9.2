import mongoose from "mongoose";
import config from "../../config/default.mjs";

const { Schema } = mongoose

const coursesSchem = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      minlength: [3, 'Course title must be at least 3 characters long'],
      maxlength: [50, 'Course title must be at most 50 characters long'],
      trim: true,
      escape: true,
    },
    time: {
      type: Number,
      required: [true, 'Course time is required'],
      min: [1, 'Course time must be at least 1 hour'],
      max: [168, 'Course time must be at most 168 hours (8 weeks)'],
      trim: true,
      escape: true,
    }
  },
  {collection: 'courses'}
);

coursesSchem.statics.checkExistDb = async function () {
  const database = await mongoose.connection.listDatabases();
  return database.databases.some((db) => db.name === config.databaseName);
};

coursesSchem.statics.checkExistCollection = async function () {
  if (!(await this.checkExistDb())) {
    console.log(`Database ${config.databaseName} does not exist`);
    return false;
  }
  const collections = await mongoose.connection.db.listCollections({name: 'products'}).toArray();
  if (collections.length === 0) {
    console.log(`Collection '${collections.name}' does not exist`);
    return false;
  } else {
    console.log(`Collection '${collections.name}' exists`);
    return true;
  }
};

const Courses = mongoose.model('Courses', coursesSchem);
export default Courses;