import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { Work } from '../../../services/work.model';
import { WorkService } from 'src/app/services/work.service';


// Dummy Interface and Data

const workData: Work[] = [
  {id: '', course: 'angular', name: 'Work 1', type: 'Type 1', date: 'Date 1', time: 'Time 1'},
  {id: '', course: 'java', name: 'Work 2', type: 'Type 2', date: 'Date 2', time: 'Time 2'},
  {id: '', course: 'c#', name: 'Work 3', type: 'Type 3', date: 'Date 3', time: 'Time 3'},
  {id: '', course: 'angular', name: 'Work 4', type: 'Type 4', date: 'Date 4', time: 'Time 4'}
];

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.css']
})
export class TrackerTableComponent implements OnInit {

  courseWork: Work[] = [];
  private courseWorkSubscription: Subscription = new Subscription;
  selection = new SelectionModel<Work>(true, []);

  constructor(public workService: WorkService) { }

  ngOnInit(): void {
    this.workService.getCourseWork();
    this.courseWorkSubscription = this.workService.getCourseWorkUpdateListener()
    .subscribe((courseWork: Work[]) => { this.courseWork = courseWork; }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  checkboxLabel(row?: Work): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  displayedColumns: string[] = ['select', 'name', 'type', 'date', 'time'];
  // data source will be fetched from the server
  dataSource = workData;

}
