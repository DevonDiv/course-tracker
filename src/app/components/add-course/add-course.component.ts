import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
  }

  onAddCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.courseService.addCourse(form.value.courseName, form.value.profName, form.value.profEmail);
    form.resetForm();
  }

}
