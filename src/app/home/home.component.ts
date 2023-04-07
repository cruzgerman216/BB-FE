import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedBlogs: any = null;
  categories: any = [];
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.fetchBlogs().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.suggestedBlogs = res.payload.suggested; 
        this.categories = res.payload.categories
      }
    });
  }
}
