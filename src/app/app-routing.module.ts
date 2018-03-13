import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { OthersComponent } from './pages/others/others.component';
import { ActivitiesComponent } from './pages/activities/activities.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'others', component: OthersComponent },
  { path: 'activities', component: ActivitiesComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
