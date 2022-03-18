// import { Component, Input, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { NgForm } from '@angular/forms';

// // import { selectedCourseWork } from '../tracker-table/tracker-table.component';
// import { Course } from '../../../services/course.model';
// import { WorkService } from 'src/app/services/work.service';


// @Component({
//   selector: 'app-edit-dialog-form',
//   templateUrl: './edit-dialog-form.component.html',
//   styleUrls: ['./edit-dialog-form.component.css']
// })
// export class EditDialogFormComponent implements OnInit {

//   courses: Course[] = [];
//   isLoading = false;
//   selectedCourseWork = selectedCourseWork;

//   constructor(private http: HttpClient,  private workService: WorkService) { }

//   ngOnInit(): void {
//     this.getCourseNames();
//   }

//   getCourseNames() {
//     let courseName = [];
//     this.http.get<{ message: string, courses: any }>('http://localhost:3000/api/courses')
//     .pipe(map((courseData) => {
//       return courseData.courses.map(course => {
//         return {
//           id: course._id,
//           courseName: course.courseName,
//           profName: course.profName,
//           profEmail: course.profEmail
//         };
//       });
//     }))
//     .subscribe((transformedCourse) => {
//       this.courses = transformedCourse;
//     });

//     for (let i = 0; i < this.courses.length; i++) {
//       courseName.push(this.courses[i].courseName);
//     }
//     return courseName;
//   }

//   updateCourseWork(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }
//     this.isLoading = true;
//     this.workService.updateCourseWork(this.selectedCourseWork.id, form.value.course, form.value.name, form.value.type, form.value.date, form.value.time);
//     this.reloadPage();
//   }

//   reloadPage() {
//     window.location.reload();
//   }

//   test() {
//     console.log("From selection model export => ", selectedCourseWork);
//   }

// }
