import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../../services/course.model';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  hide: boolean = false;
  courses: Course[] = [];
  private courseSubscription: Subscription = new Subscription;

  constructor(public courseService: CourseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.courseSubscription = this.courseService.getCourseUpdateListener()
    .subscribe((courses: Course[]) => { this.courses = courses; }
    );
  }

  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  editCourse() {
    this.hide = true;
    console.log('edit course');
  }

  updateCourse() {
    this.hide = false;
    this.openSnackBar('Course updated', 'Undo');
    console.log('update course');
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.courses[0]);
    this.openSnackBar('Course deleted', 'Undo');
  }

  undoEdit() {
    this.hide = false;
  }

}
