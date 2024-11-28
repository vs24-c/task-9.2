import mongoose from "mongoose";
import config from "../../config/default.mjs";

const { Schema } = mongoose

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be at most 50 characters long'],
      trim: true,
      escape: true,
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
      minlength: [3, 'Surname must be at least 3 characters long'],
      maxlength: [15, 'Surname must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [17, 'Age must be at least 12'],
      max: [70, 'Age must be at most 70'],
      escape: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      escape: true,
    },
    seminar_title: {
      required: false,
      type: String,
      minlength: [3, 'Course title must be at least 3 characters long'],
      maxlength: [50, 'Course title must be at most 50 characters long'],
      trim: true,
      escape: true,
    },
    seminar_time: {
      required: false,
      type: Number,
      min: [1, 'Course time must be at least 1 hour'],
      max: [168, 'Course time must be at most 168 hours (8 weeks)'],
      trim: true,
      escape: true,
    },
    isLector: {
      required: false,
      type: Boolean,
      required: false,
    },
    course: [{
      required: false,
      type: Schema.Types.ObjectId,
      ref: 'Courses',
    }],
  },
  {collection: 'students'}
);

//--------------------Creat Virtual---------------------//

studentsSchema.virtual('fullName').get(function () {
  return `${this.name} ${this.surname}`;
});

studentsSchema.set('toObject', {virtuals: true});
studentsSchema.set('toJSON', {virtuals: true});

//-----------creat Model schema db----------------------//

studentsSchema.static.checkExistDb = async function () {
  const database = await mongoose.connection.listDatabases();
  return database.databases.some((db) => db.name === config.databaseName);
};

studentsSchema.static.checkExistCollection = async function () {
  if (!(await this.checkExistDb())) {
    console.log(`Database ${config.databaseName} does not exist`);
    return false;
  }
  const collections = await mongoose.connection.db.listCollections({name: 'students'}).toArray();
  if (collections.length === 0) {
    console.log(`Collection '${this.collections.name}' does not exist`);
    return false;
  } else {
    console.log(`Collection '${this.collections.name}' exists`);
    return true;
  }
};

const Students = mongoose.model('Students', studentsSchema);
export default Students;