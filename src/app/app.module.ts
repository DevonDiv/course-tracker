import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
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

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { RegisterComponent } from './components/register/register.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderCourseComponent } from './components/header-course/header-course.component';
import { CourseComponent } from './components/course/course.component';
import { NoCoursesComponent } from './components/no-courses/no-courses.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TrackerTabsComponent } from './components/tracker-tabs/tracker-tabs.component';
import { TrackerTableComponent } from './components/tracker-table/tracker-table.component';

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
    TrackerTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
