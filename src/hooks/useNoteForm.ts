'use client';

import { useState, useCallback } from 'react';
import type { NoteFormData, NoteFormErrors } from '@/types';
import { validateNoteForm, hasErrors } from '@/utils';

/**
 * Custom hook that manages NoteForm state, validation, and submission.
 */
export function useNoteForm(onSuccess?: (data: NoteFormData) => void) {
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState<NoteFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback(
    (field: keyof NoteFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error on change if user has already attempted submit
      if (submitted) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [submitted]
  );

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const validationErrors = validateNoteForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    console.log('✅ Note submitted:', formData);
    onSuccess?.(formData);

    // Reset form after successful submission
    setFormData({ title: '', body: '' });
    setSubmitted(false);
    return true;
  }, [formData, onSuccess]);

  return {
    formData,
    errors,
    updateField,
    handleSubmit,
  };
}
