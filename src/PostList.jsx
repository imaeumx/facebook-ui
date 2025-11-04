import React from 'react';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString();
}

function PostList({ posts, onEdit, onDelete }) {
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 16}}>
          <div style={{ fontWeight: 600 }}>{post.author}</div>
          <div style={{ margin: '8px 0' }}>{post.content}</div>
          {post.imageUrl && (
            // eslint-disable-next-line
            <img src={post.imageUrl} alt="post" style={{maxWidth: "100%", marginBottom: 8}} />
          )}
          <div style={{color: '#555', fontSize: 12}}>
            Created: {formatDate(post.createdDate)}<br/>
            Modified: {formatDate(post.modifiedDate)}
          </div>
          <div style={{marginTop: 8}}>
            <button onClick={() => onEdit(post)}>Edit</button>
            <button onClick={() => onDelete(post.id)} style={{marginLeft: 8, color: "red"}}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;