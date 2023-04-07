import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../auth/user.service';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  
  blog: any = null;
  categories: any = null;
  creator: any = null;
  currentUser = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private userService: UserService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.blogService.detailBlogSubject.subscribe((updatedBlog: any) => {
      this.categories = updatedBlog.categories
      this.blog = updatedBlog;
    });
    this.userService.currentUserSubject.subscribe((currentUser: any) => {
      this.currentUser = currentUser;
    });

    this.activatedRoute.params.subscribe((params) => {
      const blogId = params.id;
      this.blogService.fetchBlog(blogId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.blog = res.payload.blog;
          this.categories = res.payload.blog.categories;
          this.creator = res.payload.blog.user;
        },
      });
    });
  }

  onDeleteBlog(){
    this.blogService.deleteBlog(this.blog.id).subscribe({
      next: (res)=>{
        this.route.navigate([`/profile/${this.currentUser.username}`])
      }
    })
  }
}
