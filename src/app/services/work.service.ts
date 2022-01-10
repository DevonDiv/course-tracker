import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Work } from "./work.model";


@Injectable ({ providedIn: 'root' })
export class WorkService {

  private courseWork: Work[] = [];
  private workUpdate = new Subject<Work[]>();

  constructor(private http: HttpClient) {}

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

  editCourseWork(id: string, course: string, name: string, type: string, date: string, time: string) {
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