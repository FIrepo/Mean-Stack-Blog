import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { AuthService } from "./auth.service";

@Injectable()
export class BlogService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService : AuthService,
    private http : Http
  ) { }

  createAuthenticationHeaders(){
      this.authService.loadToken();
      this.options = new RequestOptions({
        headers : new Headers({
          'Content-Type' : 'application/json',
          'authorization': this.authService.authToken
        })
      });
    }

    newBlog(blog){
      this.createAuthenticationHeaders();
      return this.http.post(this.domain + 'ablog/newBlog', blog, this.options).map(res => res.json());
    }

    getAllBlogs(){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'ablog/allBlogs', this.options).map(res => res.json());
    }

    getSingleBLog(id){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'ablog/singleBlog/' + id, this.options).map(res => res.json());
    }

    editBlog(blog){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + 'ablog/updateBlog/', blog, this.options).map(res => res.json());
    }

    deleteBlog(id){
      this.createAuthenticationHeaders();
      return this.http.delete(this.domain + 'ablog/deleteBlog/' + id, this.options).map(res => res.json());
    }

    likeBlog(id){
      const blogData = { id: id };
      return this.http.put(this.domain + 'ablog/likeBlog', blogData, this.options).map(res => res.json());
    }
    dislikeBlog(id){
      const blogData = { id: id };
      return this.http.put(this.domain + 'ablog/dislikeBlog', blogData, this.options).map(res => res.json());
    }

    postComment(id, comment){
      const blogData = { id: id, comment: comment };
      return this.http.post(this.domain + 'ablog/comment', blogData, this.options).map(res => res.json());
    }



}
