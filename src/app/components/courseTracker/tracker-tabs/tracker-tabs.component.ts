import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../../services/course.model';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
  selector: 'app-tracker-tabs',
  templateUrl: './tracker-tabs.component.html',
  styleUrls: ['./tracker-tabs.component.css']
})
export class TrackerTabsComponent implements OnInit {

courses: Course[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddItem() {
    const dialogRef = this.dialog.open(DialogFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDeleteItem() {

  }

}
