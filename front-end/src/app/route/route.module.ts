import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import { RouteRoutingModule } from './route-routing.module';
import { HomeComponent } from "../components/home/home.component";
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { BlogComponent } from '../components/blog/blog.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { PublicProfileComponent } from '../components/public-profile/public-profile.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { EditBlogComponent } from "../components/edit-blog/edit-blog.component";
import { AuthGuard } from "../guards/auth.guard";
import { NotAuthGuard } from "../guards/notauth.guard";
import { DeleteBlogComponent } from '../components/blog/delete-blog/delete-blog.component';


const appRoutes : Routes = [
    {path:'',component: HomeComponent},
    {path:'home',component: HomeComponent},
    {path:'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
    {path:'login',component: LoginComponent, canActivate: [NotAuthGuard]},
    {path:'register',component: RegisterComponent, canActivate: [NotAuthGuard]},
    {path:'blog',component: BlogComponent, canActivate: [AuthGuard]},
    {path:'profile',component: ProfileComponent, canActivate: [AuthGuard]},
    {path:'user/:username',component: PublicProfileComponent, canActivate: [AuthGuard]},
    {path:'edit-blog/:id',component: EditBlogComponent, canActivate: [AuthGuard]},
    {path:'delete-blog/:id',component: DeleteBlogComponent, canActivate: [AuthGuard]},
    {path:'logout',component: LogoutComponent},
    {path:'**',component: PagenotfoundComponent}
]

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule,RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class RouteModule { }
