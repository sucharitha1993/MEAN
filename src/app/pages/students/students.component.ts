import { AppLitteralsConfig } from './../../literals/app.literals';
import { ConfirmationService } from 'primeng/api';
import { IStudent } from './../../../interfaces/istudent';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public students: IStudent[];
  public studentImage: any;
  msgs: Message[] = [];
  public isAddStudent: boolean = false;
  public isUpdateStudent: boolean = false;
  public display: boolean = false;
  public AppLitteralsConfig: any = AppLitteralsConfig;
  studentForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getStudents();
  }

  //loading students from db
  getStudents() {
    this.studentService.loadStudents()
      .subscribe(data => {
        this.students = data
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Student not fetched' }];
      });
  }

  //side bar for add Student
  addStudentDialog() {
    this.initiateStudentControls();
    this.studentImage = './../../../assets/images/profile.jpg';    
    this.isAddStudent = true;
    this.isUpdateStudent = false;
    this.display = true;
  }

  //side bar for update Student
  updateStudentDialog(student) {
    const studentImg = Object.assign({},student.img) || [];
    studentImg[0] = studentImg[0] || {};
    this.studentImage = studentImg[0].url || './../../../assets/images/profile.jpg';
    this.initiateStudentControls(student);
    this.isAddStudent = false;
    this.isUpdateStudent = true;
    this.display = true;
  }

  //to create student form controls
  initiateStudentControls(student?) {
    student = student || {};
    student.name = student.name || null;
    student.id = student.id || null;
    student.standarad = student.standarad || null;
    if (student.date_of_joining)
      student.date_of_joining = new Date(student.date_of_joining) || null;
    if (student.img && student.img.length == '0')
      student.img = null;
    else
      student.img = student.img || null;
    this.studentForm = this.formBuilder.group({
      name: [student.name, Validators.required],
      id: [student.id, Validators.required],
      standarad: [student.standarad, Validators.required],
      fees: [student.fees, Validators.required],
      date_of_joining: [student.date_of_joining, Validators.required],
      img: [student.img, Validators.required],
    });
  }

  //to add Sudent to DB - C (create)
  addStudent() {
    const params: any = {
      "request": {
        'name': this.studentForm.controls['name'].value,
        'id': this.studentForm.controls['id'].value,
        'standarad': this.studentForm.controls['standarad'].value,
        'fees': this.studentForm.controls['fees'].value,
        'date_of_joining': this.studentForm.controls['date_of_joining'].value,
        'img': this.studentForm.controls['img'].value,
      }
    }
    this.isAddStudent = false;
    this.studentService.addStudent(params).subscribe(
      data => {
        this.msgs = [{ severity: 'success', detail: 'Student added Successfully!' }];
        this.getStudents();
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Student not added' }];
      })
  }

  //to update student - U (update)
  updateStudent() {
    const params: any = {
      "request": {
        'name': this.studentForm.controls['name'].value,
        'id': this.studentForm.controls['id'].value,
        'standarad': this.studentForm.controls['standarad'].value,
        'fees': this.studentForm.controls['fees'].value,
        'date_of_joining': this.studentForm.controls['date_of_joining'].value,
        'img': this.studentForm.controls['img'].value,
      }
    }
    this.isUpdateStudent = false;
    this.studentService.updateStudent(params).subscribe(
      data => {
        this.msgs = [{ severity: 'info', detail: 'Student updated Successfully!' }];
        this.getStudents();
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Student not updated' }];
      })
  }

  //delete student confirmation dialog
  deleteStudentConfirmation(studentId) {
    this.confirmationService.confirm({
      message: `Are you sure,Do you want to delete student id ${studentId}?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteStudent(studentId);
      }
    });
  }

  // to delete student - D (delete)
  deleteStudent(studentId) {
    this.studentService.deleteStudentById(studentId)
      .subscribe(data => {
        this.msgs = [{ severity: 'success', detail: 'Student deleted Successfully!' }];
        this.getStudents();
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Student not deleted' }];
      })
  }

  /**
 * Method to handle file stack upload complete
 * @param files  file stack uploaded data 
 */
  onFileStackUploadComplete(files) {
    let uploadedFiles = [];
    if (files.success) {
      files.data.forEach((data) => {
        uploadedFiles.push(data);
        this.studentForm.controls['img'].setValue(uploadedFiles);
        this.studentImage = data.url;
      });
    }
  }
}
