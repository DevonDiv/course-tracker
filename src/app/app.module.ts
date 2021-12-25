import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TrackerComponent } from './components/courseTracker/tracker/tracker.component';
import { RegisterComponent } from './components/register/register.component';
import { AddCourseComponent } from './components/courseAdding/add-course/add-course.component';
import { ButtonComponent } from './components/courseAdding/button/button.component';
import { HeaderCourseComponent } from './components/courseAdding/header-course/header-course.component';
import { CourseComponent } from './components/courseAdding/course/course.component';
import { NoCoursesComponent } from './components/courseTracker/no-courses/no-courses.component';
import { CoursesComponent } from './components/courseAdding/courses/courses.component';
import { TrackerTabsComponent } from './components/courseTracker/tracker-tabs/tracker-tabs.component';
import { TrackerTableComponent } from './components/courseTracker/tracker-table/tracker-table.component';
import { AddWorkButtonComponent } from './components/courseTracker/add-work-button/add-work-button.component';
import { DeleteWorkButtonComponent } from './components/courseTracker/delete-work-button/delete-work-button.component';
import { DialogFormComponent } from './components/courseTracker/dialog-form/dialog-form.component';

const appRoutes: Routes = [
  {path: '', component: TrackerComponent},
  {path: 'course', component: CourseComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TrackerComponent,
    RegisterComponent,
    AddCourseComponent,
    ButtonComponent,
    HeaderCourseComponent,
    CourseComponent,
    NoCoursesComponent,
    CoursesComponent,
    TrackerTabsComponent,
    TrackerTableComponent,
    AddWorkButtonComponent,
    DeleteWorkButtonComponent,
    DialogFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
