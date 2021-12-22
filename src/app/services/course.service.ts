import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Course } from "./course.model";

@Injectable()
export class CourseService {
  private courses: Course[] = [];
  private coursesUpdate = new Subject<Course[]>();

  getCourses() {
    return [...this.courses]
  }

  getCourseUpdateListener() {
    return this.coursesUpdate.asObservable();
  }

  addCourse(courseName: string, profName: string, profEmail: string) {
      const course: Course = {
        courseName: courseName,
        profName: profName,
        profEmail: profEmail
      }

      this.courses.push(course);
      this.coursesUpdate.next([...this.courses]);
  }

}
