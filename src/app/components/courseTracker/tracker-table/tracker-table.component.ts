import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { Course } from '../../../services/course.model';
import { Work } from '../../../services/work.model';
import { WorkService } from 'src/app/services/work.service';


  // Dummy Interface and Data
  const workData: Work[] = [
    {id: 'one', course: 'Frameworks', name: 'Work 1', type: 'Type 1', date: 'Date 1', time: 'Time 1'},
    {id: 'two', course: 'PHP', name: 'Work 2', type: 'Type 2', date: 'Date 2', time: 'Time 2'},
    {id: 'three', course: 'C#', name: 'Work 3', type: 'Type 3', date: 'Date 3', time: 'Time 3'},
    {id: 'four', course: 'iOS 2', name: 'Work 4', type: 'Type 4', date: 'Date 4', time: 'Time 4'}
  ];

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.css']
})
export class TrackerTableComponent implements OnInit {

  courses: Course[] = [];
  courseWork: Work[] = [];
  sCourseWork: string[] = [];
  private courseWorkSubscription: Subscription = new Subscription;
  selection = new SelectionModel<Work>(true, []);

  constructor(public workService: WorkService, private http: HttpClient,
     private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.courses = this.getCourseNames();
    this.getCourseWork();
    this.courseWorkSubscription = this.workService.getCourseWorkUpdateListener()
    .subscribe((courseWork: Work[]) => {
      this.courseWork = courseWork;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getCourseNames() {
    let courseName = [];
    this.http.get<{ message: string, courses: any }>('http://localhost:3000/api/courses')
    .pipe(map((courseData) => {
      return courseData.courses.map(course => {
        return {
          id: course._id,
          courseName: course.courseName,
          profName: course.profName,
          profEmail: course.profEmail
        };
      });
    }))
    .subscribe((transformedCourse) => {
      this.courses = transformedCourse;
    });

    for (let i = 0; i < this.courses.length; i++) {
      courseName.push(this.courses[i].courseName);
    }
    return courseName;
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

    if (this.selection.isSelected(row)) {
      this.sCourseWork.push(row.id);

      this.sCourseWork = this.sCourseWork.filter((item, pos) => {
        return this.sCourseWork.indexOf(item) === pos;
      });
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  getCourseWork() {
    let work = [];
    this.http.get<{ message: string, courseWork: any }>('http://localhost:3000/api/courseWork')
    .pipe(map((courseWorkData) => {
      return courseWorkData.courseWork.map(courseWork => {
        return {
          id: courseWork._id,
          course: courseWork.course,
          name: courseWork.name,
          type: courseWork.type,
          date: courseWork.date,
          time: courseWork.time
        };
      });
    }))
    .subscribe((transformedCourseWork) => {
      this.courseWork = transformedCourseWork;
    });

    return this.courseWork;
  }

  addCourseWork() {
    const dialogRef = this.dialog.open(DialogFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.openSnackBar('Course Work Added', 'Dismiss');
  }

  deleteCourseWork(/*courseWorkId: string, row: Work*/) {
    console.log(this.sCourseWork);
    this.sCourseWork = [];
    console.log(this.sCourseWork);
    this.openSnackBar('Course Work Deleted', 'Dismiss');
  }

  displayedColumns: string[] = ['select', 'name', 'type', 'date', 'time'];
  // data source will be fetched from the server
  dataSource = workData;
  // dataSource = this.courseWork;

}
