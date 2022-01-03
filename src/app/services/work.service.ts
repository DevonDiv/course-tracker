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

  getCourseWork() {

  }

  getCourseUpdateListener() {

  }

  addCourseWork() {

  }

  deleteCourseWork() {

  }

}
