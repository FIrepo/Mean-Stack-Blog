import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { BlogService } from "../../services/blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  form;
  commentForm;
  processing = false;
  username;
  blogPosts;
  newComment = [];
  enabledComments = [];

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private blogService : BlogService
  ) {
    this.createNewBlogPost();
    this.createCommentForm();
  }

  createNewBlogPost(){
      this.form = this.formBuilder.group({
        title : ['', Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
          this.alphaNumericValidation
        ])],
        body : ['', Validators.compose([
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(5),

        ])],
      });
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment : ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    })
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }


  enableNewBlogForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableNewBlogForm(){
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  alphaNumericValidation(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if (regExp.test(controls.value)) {
        return null;
    }else{
      return { 'alphaNumericValidation' : true };
    }
  }

  newBlogForm(){
    this.newPost = true;
  }

  reloadBlogs(){
    this.loadingBlogs = true;
    //get all blogs
    this.getAllBlogs();
    setTimeout(()=>{
      this.loadingBlogs = false;
    }, 5000);
  }

  // Function to post a new comment on blog post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the blog post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
    this.processing = false; // Enable any buttons that were locked
  }

  onSubmitBlog(){
      this.processing = true;
      this.disableNewBlogForm();

      const blog = {
        title : this.form.get('title').value,
        body : this.form.get('body').value,
        createdBy : this.username
      }

      this.blogService.newBlog(blog).subscribe(data => {
        if (!data.success) {
            this.messageClass = 'alert alert-danger';
            this.message = data.message;
            this.processing = false;
            this.enableNewBlogForm();
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          this.getAllBlogs();
          setTimeout(()=>{
            this.newPost = false;
            this.processing = false;
            this.message = false;
            this.form.reset();
            this.enableNewBlogForm()
          }, 2000);
        }
      });
  }

  goBack(){
      window.location.reload();
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    });
  }

  likeBlog(id){
    this.blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs();
    });
  }

  dislikeBlog(id){
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs();
    });
  }

  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.blogService.postComment(id, comment).subscribe(data => {
      this.getAllBlogs(); // Refresh all blogs to reflect the new comment
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      this.processing = false; // Unlock buttons on comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current blog post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });

    this.getAllBlogs();
  }


}
