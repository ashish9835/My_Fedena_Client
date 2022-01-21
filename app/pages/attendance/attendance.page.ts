import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/providers/attendanceService';
import { CoursesModel } from 'src/app/models/courses';
import { BatchesModel } from 'src/app/models/batches';
import { SubjectsModel } from 'src/app/models/subject';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  coursesData = [];
  courseId: Number;
  batch_detail = [];
  subject_detail = [];
  subjects: string;
  batches: string;
  subjectAPI= '';
 

  constructor(
    private http: HttpClient,
    private attendanceService: Attendance
  ) {}

  ngOnInit() {
    this.getCourses();
    // this.getSubjects();
  }

  course_listed: any = {
    header: 'Course',
  };

  batches_listed: any = {
    header: 'Batch',
  };

  subjects_listed: any = {
    header: 'Subjects',
  };

  

  getCourses() {
    this.attendanceService.getCourse().subscribe(
      (res: any) => {
        console.log('---------------------------------------');
        console.log(res);
        if (res.courses && res.courses != null) {
          res.courses.forEach(i => {
            this.coursesData.push(new CoursesModel(i));
          });
          console.log(this.coursesData);
        }
      },

      (error) => {
        console.log(error);
      }
    );
  }

  clickedcourse(course) {
    console.log(course.target.value);
    window.localStorage.setItem('course_id', course.target.value);
    this.batches = '';
    this.subjects = '';
    this.batch_detail = [];

    this.attendanceService.getBatches().subscribe(
      (res: any) => {
        console.log('---------------------------------------');
        console.log(res);
        if (res.batches && res.batches != null) {
          res.batches.forEach(i => {
            this.batch_detail.push(new BatchesModel(i));
          });
          console.log(this.batch_detail);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clickedBatch(batches) {
    this.subjectAPI = batches.target.value;
    console.log(batches.target.value);
    window.localStorage.setItem('batch_id', batches.target.value); 
    this.subject_detail = [];
    this.subjects = '';
    this.attendanceService.getSubjects()
      .subscribe(
        (res: any) => {
          console.log(res);
          
          if (res.subjects && res.subjects != null) {
            res.subjects.forEach(i => {
              this.subject_detail.push(new SubjectsModel(i));
            });
            console.log(this.subject_detail);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
