import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Course } from '../../../services/course.model';

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
    this.http.get<{ message: string, courses: any }>('http://localhost:3000/api/courses')
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
