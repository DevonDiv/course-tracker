import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  private mode = 'create';
  private courseId: string;

  constructor(public courseService: CourseService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('courseId')) {
        this.mode = 'edit';
        this.courseId = paramMap.get('courseId');
        this.course = this.courseService.getCourse(this.courseId);
      } else {
        this.mode = 'create';
        this.courseId = null;
      }
    });
    console.log(this.mode);
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
    if (this.mode === 'create') {
      this.courseService.addCourse(form.value.courseName, form.value.profName, form.value.profEmail);
      this.openSnackBar('Course added', 'Dismiss');
      form.resetForm();
    }
    if (this.mode === 'edit') {
      this.courseService.updateCourse(this.courseId, form.value.courseName, form.value.profName, form.value.profEmail);
      this.openSnackBar('Course updated', 'Dismiss');
    }

  }

}
