import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;

  @Input() blog = null;
  errors = [];
  categories = [];
  blogFormGroup;
  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogFormGroup = new FormGroup({
      title: new FormControl(this.blog.title),
      content: new FormControl(this.blog.content),
      image_path: new FormControl(this.blog.image_path),
      sub_title: new FormControl(this.blog.sub_title),
      category_ids: new FormControl(this.blog.category_ids),
    });

    this.categoryService.fetchCategories().subscribe({
      next: (res: any) => {
        this.categories = res.payload.categories;
      },
    });
  }

  onSubmit() {
    const editedBlog = this.blogFormGroup.value;
    this.blogService.onUpdateBlog(editedBlog, this.blog.id).subscribe({
      next: (res: any) => {
        this.closeBtn.nativeElement.click();
        this.blogService.updateBlog(res.payload.blog);
      },
    });
  }
}
