import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Course } from "./course.model";

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [];
  private coursesUpdate = new Subject<Course[]>();

  getCourses() {
    return [...this.courses]
  }

  getCourseByName(courseName: string) {
    return this.courses.find(c => c.courseName === courseName);
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

  deleteCourse(course: Course) {
    const index = this.courses.findIndex(c => c.courseName === course.courseName);
    this.courses.splice(index, 1);
    this.coursesUpdate.next([...this.courses]);
  }

}
