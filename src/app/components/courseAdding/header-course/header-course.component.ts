import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-header-course',
  templateUrl: './header-course.component.html',
  styleUrls: ['./header-course.component.css']
})
export class HeaderCourseComponent implements OnInit {

  constructor(public router: ActivatedRoute) { }

  activeRoute: string;

  ngOnInit(): void {
    this.getActiveRoute();
  }

  getActiveRoute() {
    // get the active route and store it in activeRoute variable as a string
    this.router.url.subscribe((url: UrlSegment[]) => {
      this.activeRoute = url[0].path;
    });
  }

}
