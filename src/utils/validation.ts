import type { NoteFormData, NoteFormErrors } from '@/types';

/**
 * Validates note form data and returns an errors object.
 * Returns an empty object if there are no errors.
 */
export function validateNoteForm(data: NoteFormData): NoteFormErrors {
  const errors: NoteFormErrors = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!data.body.trim()) {
    errors.body = 'Body is required.';
  } else if (data.body.trim().length < 10) {
    errors.body = 'Body must be at least 10 characters.';
  }

  return errors;
}

/**
 * Checks whether a NoteFormErrors object contains any errors.
 */
export function hasErrors(errors: NoteFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
