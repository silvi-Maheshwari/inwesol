import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/posts')
      .then((response) => setBlogs(response.data.posts));
  }, []);

  return (
    <div className="blog-container">
      <h2>Blog List</h2>
      <input 
        type="text" 
        placeholder="Search blogs..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="blog-list">
        {blogs.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase())).map((blog) => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.body.substring(0, 100)}...</p>
            <button className="read-more">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
