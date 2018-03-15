//importing Angular predefined modues
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//importing components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { OthersComponent } from './pages/others/others.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { FileStackComponent } from './pages/filestack/filestack';

//importing services
import { StudentService } from './services/student.service';
import { AppConfigService } from './services/app-config.services';


// NG PRIME Components
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    DashboardComponent,
    FacultyComponent,
    OthersComponent,
    ActivitiesComponent,
    FileStackComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //ng prime 
    TabMenuModule,
    TableModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    SidebarModule,
    CalendarModule
  ],
  providers: [StudentService, ConfirmationService, AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
