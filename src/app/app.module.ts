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
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TrackerComponent } from './components/courseTracker/tracker/tracker.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddCourseComponent } from './components/courseAdding/add-course/add-course.component';
import { HeaderCourseComponent } from './components/courseAdding/header-course/header-course.component';
import { CourseComponent } from './components/courseAdding/course/course.component';
import { NoCoursesComponent } from './components/courseTracker/no-courses/no-courses.component';
import { CoursesComponent } from './components/courseAdding/courses/courses.component';
import { TrackerTableComponent } from './components/courseTracker/tracker-table/tracker-table.component';
import { AddWorkButtonComponent } from './components/courseTracker/add-work-button/add-work-button.component';
import { DeleteWorkButtonComponent } from './components/courseTracker/delete-work-button/delete-work-button.component';
import { DialogFormComponent } from './components/courseTracker/dialog-form/dialog-form.component';
import { BackButtonComponent } from './components/courseAdding/back-button/back-button.component';
import { EditWorkButtonComponent } from './components/courseTracker/edit-work-button/edit-work-button.component';
import { AuthInterceptor } from './components/auth/register/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './components/auth/register/auth.guard';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { EditCourseWorkComponent } from './components/courseTracker/edit-course-work/edit-course-work.component';
import { EditDialogFormComponent } from './components/courseTracker/tracker-table/tracker-table.component';

const appRoutes: Routes = [
  {path: '', component: TrackerComponent, canActivate: [AuthGuard]},
  {path: 'course', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'edit/:courseId', component: CourseComponent, canActivate: [AuthGuard]},
  // {path: 'edit-course-work/:courseWorkId', component: EditCourseWorkComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'accountInfo', component: AccountDetailsComponent, canActivate: [AuthGuard]}
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
    HeaderCourseComponent,
    CourseComponent,
    NoCoursesComponent,
    CoursesComponent,
    TrackerTableComponent,
    AddWorkButtonComponent,
    DeleteWorkButtonComponent,
    DialogFormComponent,
    BackButtonComponent,
    EditWorkButtonComponent,
    AccountDetailsComponent,
    EditCourseWorkComponent,
    EditDialogFormComponent,
    ErrorComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
