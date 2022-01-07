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
import { selectedTab } from '../tracker-tabs/tracker-tabs.component';


@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.css']
})
export class TrackerTableComponent implements OnInit {

  courses: Course[] = [];
  courseWork: Work[] = [];
  selectedCourseWork: string[] = [];
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

  //Snack Bar

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  //Checkbox

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.courseWork.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.courseWork);
  }

  checkboxLabel(row?: Work): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    if (this.selection.isSelected(row)) {
      this.selectedCourseWork.push(row.id);

      this.selectedCourseWork = this.selectedCourseWork.filter((item, pos) => {
        return this.selectedCourseWork.indexOf(item) === pos;
      });
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  //Courses

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

  //Course Work

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

  deleteCourseWork() {
    console.log(this.selectedCourseWork);
    this.selectedCourseWork = [];
    console.log(this.selectedCourseWork);
    this.openSnackBar('Course Work Deleted', 'Dismiss');
  }

  displayedColumns: string[] = ['select', 'name', 'type', 'date', 'time'];

}
