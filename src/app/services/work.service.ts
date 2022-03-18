import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Work } from "./work.model";


@Injectable ({ providedIn: 'root' })
export class WorkService {

  private courseWork: Work[] = [];
  private workUpdate = new Subject<Work[]>();

  private courseWorkById: Work;
  private courseWorkUpdate = new Subject<Work>();

  constructor(private http: HttpClient) {}

  getCourseWork() {
    this.http.get<{ message: string, courseWork: any }>('http://localhost:3000/api/courseWork')
    .pipe(map((courseWorkData) => {
      return courseWorkData.courseWork.map(courseWork => {
        return {
          id: courseWork._id,
          course: courseWork.course,
          name: courseWork.name,
          type: courseWork.type,
          date: courseWork.date,
          time: courseWork.time,
          creator: courseWork.creator
        };
      });
    }))
    .subscribe((transformedCourseWork) => {
      this.courseWork = transformedCourseWork;
      this.workUpdate.next([...this.courseWork]);
    });
  }

  // getCourseWorkById(id: string) {
  //   return this.courseWork.find(c => c.id === id);
  // }

  getCourseWorkById(id: string) {
    this.http.get<{ courseWork: any }>('http://localhost:3000/api/courseWork/' + id)
    .pipe(map((courseWorkData: any) => {
      return courseWorkData.courseWork.map(courseWork => {
        return {
          id: courseWork._id,
          course: courseWork.course,
          name: courseWork.name,
          type: courseWork.type,
          date: courseWork.date,
          time: courseWork.time,
          creator: courseWork.creator
        };
      });
    }))
    .subscribe((transformedCourseWork) => {
      this.courseWorkById = transformedCourseWork;
      this.courseWorkUpdate.next(this.courseWorkById);
    });

    return this.courseWorkById;
  }

  getCourseWorkUpdateListener() {
    return this.workUpdate.asObservable();
  }

  addCourseWork(course: string, name: string, type: string, date: string, time: string) {
    const courseWork: Work = {
      id: null,
      course: course,
      name: name,
      type: type,
      date: date,
      time: time
    };

    this.http.post<{ message: string, courseWorkId: string }>('http://localhost:3000/api/courseWork', courseWork)
    .subscribe((responseData) => {
      const id = responseData.courseWorkId;
      courseWork.id = id;
      this.courseWork.push(courseWork);
      this.workUpdate.next([...this.courseWork]);
    });
  }

  updateCourseWork(id: string, course: string, name: string, type: string, date: string, time: string) {
    const courseWork: Work = {
      id: id,
      course: course,
      name: name,
      type: type,
      date: date,
      time: time
    };

    this.http.put('http://localhost:3000/api/courseWork/' + id, courseWork)
    .subscribe(response => {
      const updatedCourseWork = [...this.courseWork];
      const oldCourseWorkIndex = updatedCourseWork.findIndex(c => c.id === courseWork.id);
      updatedCourseWork[oldCourseWorkIndex] = courseWork;
      this.courseWork = updatedCourseWork;
      this.workUpdate.next([...this.courseWork]);
    });
  }

  deleteCourseWork(courseWorkId: string) {
    this.http.delete('http://localhost:3000/api/courseWork/' + courseWorkId)
    .subscribe(() => {
      const updatedCourseWork = this.courseWork.filter(courseWork => courseWork.id !== courseWorkId);
      this.courseWork = updatedCourseWork;
      this.workUpdate.next([...this.courseWork]);
    });
  }

}
