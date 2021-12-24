import { Component, OnInit } from '@angular/core';


// Dummy Interface and Data

export interface WorkItem {
  id: number,
  name: string,
  type: string,
  date: string,
  time: string
}

const workData: WorkItem[] = [
  {id: 1, name: 'Work 1', type: 'Type 1', date: 'Date 1', time: 'Time 1'},
  {id: 2, name: 'Work 2', type: 'Type 2', date: 'Date 2', time: 'Time 2'},
  {id: 3, name: 'Work 3', type: 'Type 3', date: 'Date 3', time: 'Time 3'},
  {id: 4, name: 'Work 4', type: 'Type 4', date: 'Date 4', time: 'Time 4'}
];

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.css']
})
export class TrackerTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'type', 'date', 'time'];
  // data source will be fetched from the server
  dataSource = workData;

}
