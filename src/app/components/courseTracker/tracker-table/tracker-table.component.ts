import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { Course } from '../../../services/course.model';
import { Work } from '../../../services/work.model';
import { WorkService } from 'src/app/services/work.service';
import { Router } from '@angular/router';

let selectedCourseWork;

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.css']
})
export class TrackerTableComponent implements OnInit {

  courses: Course[] = [];
  courseWork: Work[] = [];
  private courseWorkSubscription: Subscription = new Subscription;
  selection = new SelectionModel<Work>(true, []);

  isLoading = false;

  constructor(public workService: WorkService, private http: HttpClient,
     private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.courses = this.getCourseNames();
    this.getCourseWork();
    this.courseWorkSubscription = this.workService.getCourseWorkUpdateListener()
    .subscribe((courseWork: Work[]) => {
      this.courseWork = courseWork;
    });
  }

  //Snackbar

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  //Table

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
  }

  editCourseWork() {
    if(this.selection.selected.length > 1) {
      this.openSnackBar("Too many items selected. Please select one item only", "Dismiss");
    } else if (this.selection.selected.length <= 0) {
      this.openSnackBar("Please select one item", "Dismiss");
    } else {
      // this.router.navigate(['/edit-course-work/', this.selection.selected[0].id]);
      // console.log(this.selection.selected[0]);
      selectedCourseWork = this.selection.selected[0];
      console.log("From selection model => ", selectedCourseWork);
      const dialogRef = this.dialog.open(EditDialogFormComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  deleteCourseWork() {

    if(this.selection.selected.length >= 1) {
      this.isLoading = true;

      for (let i = 0; i < this.selection.selected.length; i++) {
        this.workService.deleteCourseWork(this.selection.selected[i].id);
      }

      this.reloadPage();
    } else {
      this.openSnackBar("Please select at least one item", "Dismiss");
    }

  }

  reloadPage() {
    window.location.reload();
  }

  displayedColumns: string[] = ['select', 'course', 'name', 'type', 'date', 'time'];

}

@Component({
  selector: 'app-edit-dialog-form',
  templateUrl: '../edit-dialog-form/edit-dialog-form.component.html',
  styleUrls: ['../edit-dialog-form/edit-dialog-form.component.css']
})
export class EditDialogFormComponent implements OnInit {

  courses: Course[] = [];
  isLoading = false;
  courseWork = selectedCourseWork;

  constructor(private http: HttpClient, private workService: WorkService) { }

  ngOnInit(): void {
    this.getCourseNames();
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

  updateCourseWork(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.workService.updateCourseWork(this.courseWork.id, form.value.course, form.value.name, form.value.type, form.value.date, form.value.time);
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

}
