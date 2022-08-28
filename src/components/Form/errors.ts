import * as yup from 'yup';

export const getMessage = (error: yup.ValidationError) => error.message;

export const errors = {
  mixed: {
    default: 'The ${path} is invalid.',
    required: 'The ${path} is required.',
    oneOf: 'The ${path} must be one of the following values: ${values}.',
    notOneOf: 'The ${path} must not be one of the following values: ${values}.'
  },
  string: {
    length: 'The ${path} must be exactly ${length} characters.',
    min: 'The ${path} must be at least ${min} characters.',
    max: 'The ${path} must be at most ${max} characters.',
    matches: 'The ${path} must match the following: "${regex}".',
    email: 'The ${path} is invalid.',
    url: 'The ${path} must be a valid URL.',
    trim: 'The ${path} must be a trimmed string.',
    lowercase: 'The ${path} must be a lowercase string.',
    uppercase: 'The ${path} must be a upper case string.'
  },
  number: {
    min: 'The ${path} must be greater than or equal to ${min}.',
    max: 'The ${path} must be less than or equal to ${max}.',
    lessThan: 'The ${path} must be less than ${less}.',
    moreThan: 'The ${path} must be greater than ${more}.',
    notEqual: 'The ${path} must be not equal to ${notEqual}.',
    positive: 'The ${path} must be a positive number.',
    negative: 'The ${path} must be a negative number.',
    integer: 'The ${path} must be an integer.'
  },
  date: {
    min: 'The ${path} must be later than ${min}.',
    max: 'The ${path} must be at earlier than ${max}.'
  },
  boolean: {},
  object: {
    noUnknown: 'The ${path} cannot have keys not specified in the object shape.'
  },
  array: {
    min: 'The ${path} must have at least ${min} items.',
    max: 'The ${path} must have less than or equal to ${max} items.'
  }
};
