import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Course } from '../../../services/course.model';
import { WorkService } from '../../../services/work.service';
import { Work } from 'src/app/services/work.model';

@Component({
  selector: 'app-edit-course-work',
  templateUrl: './edit-course-work.component.html',
  styleUrls: ['./edit-course-work.component.css']
})
export class EditCourseWorkComponent implements OnInit {

  courses: Course[] = [];
  courseWork: Work;
  private courseWorkId: string;

  isLoading = false;
  selectedCourse: string;
  selectedType: string;

  constructor(private http: HttpClient, private workService: WorkService,
     private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.workService.getCourseWork();
    this.getCourseNames();
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      console.log(paramMap.get('courseWorkId'));
      if (paramMap.has('courseWorkId')) {
        this.courseWorkId = paramMap.get('courseWorkId');
        this.courseWork = await this.workService.getCourseWorkById(this.courseWorkId);
        this.selectedCourse = await this.courseWork.course;
        this.selectedType = await this.courseWork.type;
      }
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

  updateCourseWork(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.workService.updateCourseWork(this.courseWorkId, form.value.course, form.value.name, form.value.type, form.value.date, form.value.time);
    this.router.navigate(['/']);
  }

}
