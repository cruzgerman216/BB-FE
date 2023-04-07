import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private authService:AuthService, private userService:UserService, private route:Router, private blogService:BlogService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const loginUser = this.loginForm.value;
    this.authService.login(loginUser).subscribe((res:any)=>{
      if(res.success){
        this.userService.setCurrentUser(res.payload.user)
        this.blogService.setBlogs(res.payload.user.blogs)
        this.route.navigate(['/home'])
        this.authService.setToken(res.payload.token)
        console.log(res)
      }
    })
  }

}
