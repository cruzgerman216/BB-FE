import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  fetchCategories(){
    return this.http.get("http://localhost:3000/api/v1/categories")
  }
}
