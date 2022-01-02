import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Course } from "./course.model";

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [];
  private coursesUpdate = new Subject<Course[]>();

  constructor(private http: HttpClient) {}

  getCourses() {
    // return [...this.courses]
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
      this.coursesUpdate.next([...this.courses]);
    })
  }

  getCourseByName(courseName: string) {
    return this.courses.find(c => c.courseName === courseName);
  }

  getCourseUpdateListener() {
    return this.coursesUpdate.asObservable();
  }

  addCourse(courseName: string, profName: string, profEmail: string) {
      const course: Course = {
        id: null,
        courseName: courseName,
        profName: profName,
        profEmail: profEmail
      };

      this.http.post<{ message: string, courseId: string }>('http://localhost:3000/api/courses', course)
      .subscribe((responseData) => {
        const id = responseData.courseId;
        course.id = id;
        this.courses.push(course);
        this.coursesUpdate.next([...this.courses]);
      });
  }

  deleteCourse(course: Course) {
    const index = this.courses.findIndex(c => c.courseName === course.courseName);
    this.courses.splice(index, 1);
    this.coursesUpdate.next([...this.courses]);
  }

}
