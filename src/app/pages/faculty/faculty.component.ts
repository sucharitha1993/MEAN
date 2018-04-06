import { FacultyService } from './../../services/faculty.service';
import { AppLitteralsConfig } from './../../literals/app.literals';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  public faculty: any[];
  public facultyImage: any;
  msgs: Message[] = [];
  public isAddFaculty: boolean = false;
  public isUpdateFaculty: boolean = false;
  public display: boolean = false;
  public AppLitteralsConfig: any = AppLitteralsConfig;
  facultyForm: FormGroup;
  public searchText: any;
  public categories: any[] = [
    { label: 'Name', value: 'name' },
    { label: 'Id', value: 'id' },
    { label: 'Teaching Standard', value: 'teaching_standarad' },
    { label: 'Subject', value: 'subjects' },
    { label: 'Salary', value: 'salary' }
    // { label: 'Date Of Joining', value: 'date_of_joining' }
  ];
  public selectedCategory: string;


  constructor(private formBuilder: FormBuilder, private facultyService: FacultyService, private confirmationService: ConfirmationService) {
    this.selectedCategory = this.categories[0].value;
  }

  ngOnInit() {
    this.getFaculty();
  }

  //loading faculty from db
  getFaculty() {
    this.facultyService.loadFaculty()
      .subscribe(data => {
        this.faculty = data;
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Faculty not fetched' }];
      });
  }

  //side bar for add Faculty
  addFacultyDialog() {
    this.initiateFacultyControls();
    this.facultyImage = './../../../assets/images/profile.jpg';
    this.isAddFaculty = true;
    this.isUpdateFaculty = false;
    this.display = true;
  }

  //side bar for update Faculty
  updateFacultyDialog(faculty) {
    const facultyImg = Object.assign({}, faculty.img) || [];
    facultyImg[0] = facultyImg[0] || {};
    this.facultyImage = facultyImg[0].url || './../../../assets/images/profile.jpg';
    this.initiateFacultyControls(faculty);
    this.isAddFaculty = false;
    this.isUpdateFaculty = true;
    this.display = true;
  }

  //to create faculty form controls
  initiateFacultyControls(faculty?) {
    faculty = faculty || {};
    faculty.name = faculty.name || null;
    faculty.id = faculty.id || null;
    faculty.subjects = faculty.subjects || null;
    faculty.teaching_standarad = faculty.teaching_standarad || null;
    if (faculty.date_of_joining)
      faculty.date_of_joining = new Date(faculty.date_of_joining) || null;
    if (faculty.img && faculty.img.length == '0')
      faculty.img = null;
    else
      faculty.img = faculty.img || null;
    this.facultyForm = this.formBuilder.group({
      name: [faculty.name, Validators.required],
      id: [faculty.id, Validators.required],
      teaching_standarad: [faculty.teaching_standarad, Validators.required],
      subjects: [faculty.subjects, Validators.required],
      salary: [faculty.salary, Validators.required],
      date_of_joining: [faculty.date_of_joining, Validators.required],
      img: [faculty.img, Validators.required],
    });
  }

  //to add Sudent to DB - C (create)
  addFaculty() {
    const params: any = {
      "request": {
        'name': this.facultyForm.controls['name'].value,
        'id': this.facultyForm.controls['id'].value,
        'teaching_standarad': this.facultyForm.controls['teaching_standarad'].value,
        'salary': this.facultyForm.controls['salary'].value,
        'subjects': this.facultyForm.controls['subjects'].value,
        'date_of_joining': this.facultyForm.controls['date_of_joining'].value,
        'img': this.facultyForm.controls['img'].value,
      }
    }
    this.isAddFaculty = false;
    this.facultyService.addFaculty(params).subscribe(
      data => {
        this.msgs = [{ severity: 'success', detail: 'Faculty added Successfully!' }];
        this.getFaculty();
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Faculty not added' }];
      })
  }

  //to update faculty - U (update)
  updateFaculty() {
    const params: any = {
      "request": {
        'name': this.facultyForm.controls['name'].value,
        'id': this.facultyForm.controls['id'].value,
        'teaching_standarad': this.facultyForm.controls['teaching_standarad'].value,
        'salary': this.facultyForm.controls['salary'].value,
        'subjects': this.facultyForm.controls['subjects'].value,
        'date_of_joining': this.facultyForm.controls['date_of_joining'].value,
        'img': this.facultyForm.controls['img'].value,
      }
    }
    this.isUpdateFaculty = false;
    this.facultyService.updateFaculty(params).subscribe(
      data => {
        this.msgs = [{ severity: 'info', detail: 'Faculty updated Successfully!' }];
        this.getFaculty();
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Faculty not updated' }];
      })
  }

  //delete faculty confirmation dialog
  deleteFacultyConfirmation(id) {
    this.confirmationService.confirm({
      message: `Are you sure,Do you want to delete faculty id ${id}?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteFaculty(id);
      }
    });
  }

  // to delete faculty - D (delete)
  deleteFaculty(id) {
    this.facultyService.deleteFacultyById(id)
      .subscribe(data => {
        this.msgs = [{ severity: 'success', detail: 'Faculty deleted Successfully!' }];
        this.getFaculty();
      },
      error => {
        this.msgs = [{ severity: 'error', detail: 'Faculty not deleted' }];
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
        this.facultyForm.controls['img'].setValue(uploadedFiles);
        this.facultyImage = data.url;
      });
    }
  }
}

