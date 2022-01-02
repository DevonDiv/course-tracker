import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../../services/course.model';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  enteredCourseName = '';
  enteredProfName = '';
  enteredProfEmail = '';
  course: Course;

  constructor(public courseService: CourseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  onAddCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.courseService.addCourse(form.value.courseName, form.value.profName, form.value.profEmail);
    this.openSnackBar('Course added', 'Dismiss');
    form.resetForm();
  }

}
