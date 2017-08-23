import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouteModule } from "./route/route.module";
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthService } from "./services/auth.service";
import { BlogService } from "./services/blog.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notauth.guard";
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    BlogComponent,
    ProfileComponent,
    LogoutComponent,
    EditBlogComponent,
    PagenotfoundComponent,
    DeleteBlogComponent,
    PublicProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouteModule,
    FlashMessagesModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
