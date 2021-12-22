import { Component, OnInit } from '@angular/core';

import { Work } from '../../services/work.model';

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.css']
})
export class TrackerTableComponent implements OnInit {

  courseWork: Work[] = [
    {
      id: 1,
      name: 'Assignment 1',
      type: 'Assignment',
      date: '10/10/2022',
      time: '10:00'
    },
    {
      id: 2,
      name: 'Assignment 2',
      type: 'Assignment',
      date: '10/11/2022',
      time: '10:00'
    },
    {
      id: 3,
      name: 'Quiz 1',
      type: 'Quiz',
      date: '10/10/2022',
      time: '12:00'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
