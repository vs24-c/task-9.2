import { body } from "express-validator";

class ValidateSchemStudent {
  static studentValidationRules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({min: 3, max: 15})
      .withMessage('Name must be between 3 and 15 characters long')
      .trim()
      .escape(),
    body('surname')
      .notEmpty()
      .withMessage('Surname is required')
      .isLength({min: 3, max: 15})
      .withMessage('Surname must be between 3 and 15 characters long')
      .trim()
      .escape(),
    body('age')
      .notEmpty()
      .withMessage('Age is required')
      .isInt({gt: 17})
      .withMessage('Age must be greater than 17')
      .trim()
      .escape(),
    body('rating')
      .notEmpty()
      .withMessage('Rating is required')
      .isFloat({min: 0, max: 150})
      .withMessage('Rating must be between 0 and 150')
      .trim()
      .escape(),
    body('seminar_title')
      .isLength()
      .withMessage('Seminar title must be provided')
      .trim()
     .escape(),
    body('seminar_time')
      .isLength()
      .withMessage('Seminar time must be provided')
      .trim()
      .escape(),
    body('isLector')
      .trim()
     .escape(),
  ];
}

export default ValidateSchemStudent;