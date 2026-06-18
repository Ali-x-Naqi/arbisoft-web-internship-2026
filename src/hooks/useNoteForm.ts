'use client';

import { useState, useCallback } from 'react';
import type { Note, NoteFormData, NoteFormErrors } from '@/types';
import { validateNoteForm, hasErrors } from '@/utils';

export function useNoteForm(onSuccess?: (note: Note) => void) {
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState<NoteFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = useCallback(
    (field: keyof NoteFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setApiError(null);
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

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    const validationErrors = validateNoteForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    setIsSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = (await res.json()) as { data?: Note; error?: string };

      if (!res.ok) {
        setApiError(json.error ?? 'Failed to save note. Please try again.');
        return false;
      }

      if (json.data) {
        onSuccess?.(json.data);
      }
      setFormData({ title: '', body: '' });
      setSubmitted(false);
      return true;
    } catch {
      setApiError('Network error. Please check your connection.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSuccess]);

  return {
    formData,
    errors,
    apiError,
    isSubmitting,
    updateField,
    handleSubmit,
  };
}
