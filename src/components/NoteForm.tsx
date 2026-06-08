'use client';

import { useNoteForm } from '@/hooks';

export default function NoteForm() {
  const { formData, errors, updateField, handleSubmit } = useNoteForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      id="note-form"
      onSubmit={onSubmit}
      className="w-full max-w-lg space-y-5 rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm"
      noValidate
    >
      <h2 className="text-xl font-semibold text-white">Create a Note</h2>

      {/* Title Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="note-title"
          className="block text-sm font-medium text-gray-300"
        >
          Title
        </label>
        <input
          id="note-title"
          type="text"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Give your note a title…"
          className={`w-full rounded-lg border bg-gray-800/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:ring-2 ${
            errors.title
              ? 'border-red-500/60 focus:ring-red-500/40'
              : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/40'
          }`}
        />
        {errors.title && (
          <p
            id="note-title-error"
            role="alert"
            className="text-xs font-medium text-red-400"
          >
            {errors.title}
          </p>
        )}
      </div>

      {/* Body Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="note-body"
          className="block text-sm font-medium text-gray-300"
        >
          Body
        </label>
        <textarea
          id="note-body"
          value={formData.body}
          onChange={(e) => updateField('body', e.target.value)}
          placeholder="Write your note content here…"
          rows={5}
          className={`w-full resize-none rounded-lg border bg-gray-800/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:ring-2 ${
            errors.body
              ? 'border-red-500/60 focus:ring-red-500/40'
              : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/40'
          }`}
        />
        {errors.body && (
          <p
            id="note-body-error"
            role="alert"
            className="text-xs font-medium text-red-400"
          >
            {errors.body}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        id="note-submit"
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98]"
      >
        Save Note
      </button>
    </form>
  );
}
