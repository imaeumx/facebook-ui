import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostList from './PostList';

const API = 'http://localhost:8080/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    const res = await axios.get(API);
    setPosts(res.data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleCreate = async (post) => {
    await axios.post(API, post);
    fetchPosts();
  };

  const handleUpdate = async (id, post) => {
    await axios.put(`${API}/${id}`, post);
    setEditingPost(null);
    fetchPosts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchPosts();
  };

  const handleEdit = (post) => setEditingPost(post);

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "system-ui",
        background: "#f7f7fb"
      }}
    >
      <div style={{
        maxWidth: 700,
        width: '100%',
        background: "#fff",
        padding: '2rem',
        borderRadius: 16,
        boxShadow: "0 2px 24px rgba(0,0,0,0.07)"
      }}>
        <h1 style={{textAlign: 'center'}}>Facebook Posts</h1>
        <PostForm
          onSubmit={editingPost ? (data) => handleUpdate(editingPost.id, data) : handleCreate}
          initialData={editingPost}
          onCancel={() => setEditingPost(null)}
        />
        <hr/>
        <PostList
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;