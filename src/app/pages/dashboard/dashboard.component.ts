import { StudentService } from './../../services/student.service';
import { students } from './../../../mock-data/students-mock-data';
import { IStudent } from './../../../interfaces/istudent';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public students: IStudent[];

  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.students = students || [];
    this.students = this.students.slice(0, 3);
  }
}
