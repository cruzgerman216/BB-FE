import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavComponent } from './shared/nav/nav.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateBlogComponent } from './shared/modals/create-blog/create-blog.component';
import { EditBlogComponent } from './shared/modals/edit-blog/edit-blog.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, NavComponent, LoginComponent, HomeComponent, BlogDetailComponent, ProfileComponent, CreateBlogComponent, EditBlogComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
