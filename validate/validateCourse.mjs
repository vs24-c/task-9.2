import { body } from "express-validator";

class ValidateSchemCours {
  static validateCours = [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({min: 3, max: 50})
      .withMessage('Title must be between 3 and 50 characters long')
      .trim()
      .escape(),
    body('time')
      .notEmpty()
      .withMessage('Time is required')
      .isNumeric()
      .withMessage('Time must be a number')
      .isFloat({min: 1, max: 168})
      .withMessage('Course time must be at most 168 hours (8 weeks)')
      .trim()
      .escape(),
  ];
}

export default ValidateSchemCours;