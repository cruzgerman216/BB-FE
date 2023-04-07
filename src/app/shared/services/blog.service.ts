import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

const URL = 'http://localhost:3000/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  currentUserBlogs = [];
  currentUserBlogsSubject: Subject<any> = new Subject();
  detailBlogSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  fetchBlogs() {
    return this.http.get(`${URL}/blogs/home`);
  }

  fetchBlog(id: number) {
    return this.http.get(`${URL}/blogs/${id}`);
  }

  createBlog(blog) {
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.post('http://localhost:3000/api/v1/blogs', blog, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  }

  onAddBlog(blog) {
    this.setBlogs([...this.currentUserBlogs, blog]);
  }

  setBlogs(blogs) {
    this.currentUserBlogs = blogs;
    this.currentUserBlogsSubject.next(blogs);
  }

  onUpdateBlog(updatedBlog, id) {
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.put(
      `http://localhost:3000/api/v1/blogs/${id}`,
      updatedBlog,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
  }
  updateBlog(editBlog: any) {
    this.detailBlogSubject.next(editBlog);
    const index = this.currentUserBlogs.findIndex(
      (blog) => blog.id === editBlog.id
    );
    this.currentUserBlogs[index] = editBlog;
    this.setBlogs(this.currentUserBlogs);
  }

  deleteBlog(id) {
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.delete(`http://localhost:3000/api/v1/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  }
}
