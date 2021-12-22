import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.courseSubscription = this.courseService.getCourseUpdateListener()
    .subscribe((courses: Course[]) => { this.courses = courses; }
    );
  }

  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe();
  }

  editCourse() {
    this.hide = true;
    console.log('edit course');
  }

  updateCourse() {
    this.hide = false;
    console.log('update course');
  }

  deleteCourse() {
    console.log('delete course');
  }

}
