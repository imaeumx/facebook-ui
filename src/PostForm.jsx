import React, { useState, useEffect } from 'react';

const defaultData = { author: '', content: '', imageUrl: '' };

function PostForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(defaultData);

  useEffect(() => {
    setForm(initialData || defaultData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.author || !form.content) return;
    onSubmit(form);
    setForm(defaultData);
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <h2>{initialData ? 'Edit Post' : 'Create Post'}</h2>
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        required
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        required
        placeholder="Write post content..."
        style={{ width: '100%', marginBottom: 8, padding: 8, minHeight: 60 }}
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL (optional)"
        style={{ width: '100%', marginBottom: 8, padding: 8 }}
      />
      <div>
        <button type="submit">{initialData ? 'Update' : 'Post'}</button>
        {initialData && <button type="button" onClick={onCancel} style={{marginLeft: 10}}>Cancel</button>}
      </div>
    </form>
  );
}

export default PostForm;