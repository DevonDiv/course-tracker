import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  hide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  editCourse() {
    this.hide = true;
    console.log('edit course');
  }

  updateCourse() {
    this.hide = false;
    console.log('update course');
  }

  deleteCourse() {
    console.log('delete course');
  }

}
