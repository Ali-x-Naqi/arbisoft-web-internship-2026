/** Represents a single note in the application */
export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO 8601 string — serialized over HTTP
}

/** Shape of the NoteForm data before submission */
export interface NoteFormData {
  title: string;
  body: string;
}

/** Validation errors for the NoteForm */
export interface NoteFormErrors {
  title?: string;
  body?: string;
}
