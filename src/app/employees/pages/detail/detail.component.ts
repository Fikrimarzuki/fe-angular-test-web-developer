import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, EmployeeService } from 'src/app/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  title="employee detail";
  employee: Employee | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEmployee()  
  }

  goBackToPrevPage(): void {
    this.location.back()
  }

  formatNumber(money: number = 0): string {
    return `Rp. ${money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")},00`
  }

  getEmployee(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => {
      this.employee = employees.find(el => el.id === this.route.snapshot.paramMap.get('id'))
      if (this.employee) {
        this.employee.basicSalary = this.formatNumber(+this.employee.basicSalary)
      }
    })
  }
}
