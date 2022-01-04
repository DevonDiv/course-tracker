import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../../services/course.model';
import { Work } from 'src/app/services/work.model';
import { WorkService } from 'src/app/services/work.service';


@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  courses: Course[] = [];
  dialogRef: any;

  selectedCourse: string;
  selectedType: string;

  constructor(private http: HttpClient, private workService: WorkService, private snackBar: MatSnackBar) { }

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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  addCourseWork(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    // this.workService.addCourseWork(form.value.course, form.value.name, form.value.type, form.value.date, form.value.time);
    // this.openSnackBar('Course Work added', 'Dismiss');
    // form.resetForm();
    console.log(form.value.date);
  }

}
