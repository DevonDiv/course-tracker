import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Course } from '../../../services/course.model';

@Component({
  selector: 'app-tracker-tabs',
  templateUrl: './tracker-tabs.component.html',
  styleUrls: ['./tracker-tabs.component.css']
})
export class TrackerTabsComponent implements OnInit {

courses: Course[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) { }

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
