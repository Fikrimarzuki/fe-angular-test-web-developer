import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EmployeeRoutingModule } from "./employees.routing.module";
import { ListComponent, AddComponent, DetailComponent } from "./pages";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared";

@NgModule({
  declarations: [ListComponent, AddComponent, DetailComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: []
})

export class EmployeesModule {}