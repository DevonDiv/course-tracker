import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Course } from 'src/app/services/course.model';

@Component({
  selector: 'app-tracker-tabs',
  templateUrl: './tracker-tabs.component.html',
  styleUrls: ['./tracker-tabs.component.css']
})
export class TrackerTabsComponent implements OnInit {

courses: Course[] = [
  {
    courseName: 'Angular',
    profName: 'John Doe',
    profEmail: 'doe@gmail.com'
  },
  {
    courseName: 'Framework',
    profName: 'John Doe',
    profEmail: 'doe@gmail.com'
  },
  {
    courseName: 'iOS',
    profName: 'John Doe',
    profEmail: 'doe@gmail.com'
  }
]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddItem() {
    const dialogRef = this.dialog.open(TrackerTabsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-tracker-tabs-dialog',
  templateUrl: './tracker-tabs-dialog.html',
  styleUrls: ['./tracker-tabs.component.css']
})
export class TrackerTabsDialogComponent {}
