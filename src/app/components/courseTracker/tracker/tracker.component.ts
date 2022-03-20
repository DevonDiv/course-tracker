import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Course } from '../../../services/course.model';

const BACKEND_URL = environment.apiURL + "/courses/";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  courses: Course[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCourseNames();
  }

  getCourseNames() {
    let courseName = [];
    this.http.get<{ message: string, courses: any }>(BACKEND_URL)
    .pipe(map((courseData) => {
      return courseData.courses.map(course => {
        return {
          id: course._id,
          courseName: course.courseName,
          profName: course.profName,
          profEmail: course.profEmail
        };
      });
    }))
    .subscribe((transformedCourse) => {
      this.courses = transformedCourse;
    });

    for (let i = 0; i < this.courses.length; i++) {
      courseName.push(this.courses[i].courseName);
    }
    return courseName;
  }

}
