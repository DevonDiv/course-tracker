import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Course } from "./course.model";

const BACKEND_URL = environment.apiURL + "/courses/";

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [];
  private coursesUpdate = new Subject<Course[]>();

  constructor(private http: HttpClient) {}

  getCourses() {
    // return [...this.courses]
    this.http.get<{ message: string, courses: any }>(BACKEND_URL)
    .pipe(map((courseData) => {
      return courseData.courses.map(course => {
        return {
          id: course._id,
          courseName: course.courseName,
          profName: course.profName,
          profEmail: course.profEmail,
          creator: course.creator
        };
      });
    }))
    .subscribe((transformedCourse) => {
      this.courses = transformedCourse;
      this.coursesUpdate.next([...this.courses]);
    });
  }

  getCourse(id: string) {
    return {...this.courses.find(p => p.id === id)};
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

      this.http.post<{ message: string, courseId: string }>(BACKEND_URL, course)
      .subscribe((responseData) => {
        const id = responseData.courseId;
        course.id = id;
        this.courses.push(course);
        this.coursesUpdate.next([...this.courses]);
      });
  }

  updateCourse(id: string, courseName: string, profName: string, profEmail: string) {
    const course: Course = {
      id: id,
      courseName: courseName,
      profName: profName,
      profEmail: profEmail
    };

    this.http.patch(BACKEND_URL + id, course)
    .subscribe(response => {
      const updatedCourses = [...this.courses];
      const oldCourseIndex = updatedCourses.findIndex(c => c.id === course.id);
      updatedCourses[oldCourseIndex] = course;
      this.courses = updatedCourses;
      this.coursesUpdate.next([...this.courses]);
    });
  }

  deleteCourse(courseId: string) {
    this.http.delete(BACKEND_URL + courseId)
    .subscribe(() => {
      const updatedCourses = this.courses.filter(course => course.id !== courseId);
      this.courses = updatedCourses;
      this.coursesUpdate.next([...this.courses]);
    });
  }

}
