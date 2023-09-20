import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from 'src/app/core';
import { faChevronLeft, faChevronRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { CookieService } from 'ngx-cookie-service';

interface QueryParams {
  page?: string;
  limit?: string;
  keyword?: string;
  sort?: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  title="employee-list";
  timer: ReturnType<typeof setTimeout> | undefined;
  totalPage=0;
  pagination=1;
  limit=20;
  keyword="";
  sortedBy="";
  isLogin=false;
  faChevronRight=faChevronRight;
  faChevronLeft=faChevronLeft;
  faEdit=faEdit;
  faTrash=faTrash;
  employees: Employee[] | undefined;
  tempEmployees: Employee[] | undefined;
  tHead=[
    { title: "No", value: "no" },
    { title: "Username", value: "username" },
    { title: "Firstname", value: "firstName" },
    { title: "LastName", value: "lastName" },
    { title: "Email", value: "email" },
    { title: "Birth Date", value: "birthDate" },
    { title: "Salary", value: "basicSalary" },
    { title: "Status", value: "status" },
    { title: "Group", value: "group" },
    { title: "Join Date", value: "description" },
    { title: "Action", value: "" }
  ]

  constructor(
    private employeeService: EmployeeService,
    private cookieService: CookieService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  formatNumber(money: number | string = 0): string {
    return `Rp. ${money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")},00`
  }

  ngOnInit(): void {
    this.isLogin = this.cookieService.check("LOGIN_INFO")
    this.activateRoute.queryParams
      .subscribe((params: QueryParams) => {
        const { keyword, limit, page, sort } = params
        if (keyword) this.keyword = keyword
        if (limit) this.limit = +limit
        if (page) this.pagination = +page
        if (sort) this.sortedBy = sort
      })
    this.getEmployees()
  }

  setEmployees(word?: string): void {
    let employees = this.tempEmployees ? [...this.tempEmployees] : []
    if (word) {
      employees = employees.filter(el => {
        return el.firstName.toLowerCase().includes(word) || el.lastName.toLowerCase().includes(word)
      })
    }
    if (this.sortedBy) {
      type ObjectKey = keyof Employee
      const k = this.sortedBy as ObjectKey
      employees = employees.sort((a, b) => {
        if (a[k] && b[k]) {
          const left = a[k] || ""
          const right = b[k] || ""
          if (left > right) return 1;
          if (left < right) return -1;
        }
        return 0
      })
    }
    this.employees = employees.slice((this.pagination - 1) * this.limit, this.limit)
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => {
      this.tempEmployees = employees
      this.totalPage = Math.ceil(employees.length / this.limit)
      this.setEmployees(this.keyword)
    });
  }

  changeUrl(): void {
    let queryParams: QueryParams = {};
    if (this.pagination > 1) queryParams.page = this.pagination.toString()
    if (this.limit) queryParams.limit = this.limit.toString()
    if (this.keyword) queryParams.keyword = this.keyword
    if (this.sortedBy) queryParams.sort = this.sortedBy

    this.router.navigate(
      [],
      {
        relativeTo: this.activateRoute,
        queryParams
      }
    )
  }

  handleFilter(): void {
    this.setEmployees(this.keyword)
    this.changeUrl()
  }

  handleEdit(): void {
    Swal.fire({
      title: "Update Data",
      text: "Are you sure you want to update this data?",
      customClass: {
        title: "tw-pb-4 tw-text-white tw-bg-amber-500"
      },
      icon: "info",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#3B82F6",
      confirmButtonText: "Yes, update it!"
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success update",
          text: "Data updated",
          customClass: {
            title: "tw-pb-4 tw-text-white tw-bg-amber-500"
          },
          showCloseButton: true,
          confirmButtonColor: "#3B82F6",
        })
      }
    })
  }

  handleDelete(employeeId?: string): void {
    Swal.fire({
      title: "Delete Data",
      text: "Are you sure you want to delete this data?",
      customClass: {
        title: "tw-pb-4 tw-text-white tw-bg-red-500"
      },
      icon: "info",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#3B82F6",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        this.employeeService
        .deleteEmployee(<string>employeeId)
        .subscribe((_) => {
          this.getEmployees()
          Swal.fire({
            title: "Success delete",
            icon: "success",
            text: "Data deleted",
            confirmButtonColor: "#3B82F6",
          })
        })
      }
    })
  }

  handlePagination(key: string): void {
    if (key === "prev") {
      if (this.pagination === 1) return
      this.pagination -= 1
    } else {
      if (this.pagination >= this.totalPage) return
      this.pagination += 1
    }
    this.employees = this.tempEmployees?.slice((this.pagination - 1) * this.limit, this.limit * this.pagination)
    this.changeUrl()
  }

  navigateTo(id: string | undefined) {
    if (this.cookieService.check("LOGIN_INFO")) {
      this.router.navigate([`/employees/detail/${id}`])
    } else {
      Swal.fire({
        icon: "info",
        title: "Login First",
        text: "Please Login to see employee detail page"
      })
    }
  }
}
