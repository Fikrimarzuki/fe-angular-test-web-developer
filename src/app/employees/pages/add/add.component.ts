import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee, EmployeeService } from 'src/app/core';
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-employee-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  faChevronDown=faChevronDown;
  faChevronUp=faChevronUp;
  title="employee add";
  groupList=[""];
  tempGroupList=[""];
  keyword="";
  group="";
  isShow=false;
  employeeForm = this.fb.group({
    username: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.email],
    birthDate: [""],
    basicSalary: [0, Validators.required],
    status: ["", Validators.required],
    group: [""],
    description: [""]
  })

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dropElement: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGroup()
  }

  toggleDropdown(): void {
    this.isShow = !this.isShow
  }

  select(item: string) {
    this.group = item
    this.employeeForm.value.group = item
    this.isShow = false
  }
  
  getGroup(): void {    
    this.employeeService
      .getEmployees()
      .subscribe(employees => {
        this.tempGroupList = employees.map(el => el.group)
        this.groupList = this.tempGroupList.slice(0,10)
      })
  }

  handleAdd(): void {
    const newEmployee = <Employee>{ ...this.employeeForm.value }
    newEmployee.group = this.group
    
    console.log(this.employeeForm.value);
    
    // this.employeeService
    //   .addEmployee(newEmployee)
    //   .subscribe(employee => {
    //     Swal.fire({
    //       title: "Success create employee",
    //       icon: "success",
    //       confirmButtonColor: "#3B82F6",
    //     })
    //     this.router.navigate(["/employees"])
    //   })
  }

  handleSearch(e: string) {
    const val = e.toLowerCase()
    let temp =  this.tempGroupList.slice(0, 10)
    if (val) {
      temp = this.tempGroupList.filter(g => g.toLowerCase().includes(val))
    }
    this.groupList = temp
  }
  
  handleChangeDate({ key, value }: { key: string, value: string}) {
    type ObjectKey = keyof typeof this.employeeForm.value
    const k = key as ObjectKey
    this.employeeForm.patchValue({
      [k]: value
    })
  }
}
