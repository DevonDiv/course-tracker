import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/services/course.model';

@Component({
  selector: 'app-tracker-tabs',
  templateUrl: './tracker-tabs.component.html',
  styleUrls: ['./tracker-tabs.component.css']
})
export class TrackerTabsComponent implements OnInit {

courses: Course[] = [
  // {
  //   courseName: 'Angular',
  //   profName: 'John Doe',
  //   profEmail: 'doe@gmail.com'
  // },
  // {
  //   courseName: 'Framework',
  //   profName: 'John Doe',
  //   profEmail: 'doe@gmail.com'
  // },
  // {
  //   courseName: 'iOS',
  //   profName: 'John Doe',
  //   profEmail: 'doe@gmail.com'
  // }
]

  constructor() { }

  ngOnInit(): void {
  }

}
