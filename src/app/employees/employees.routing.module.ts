import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent, AddComponent, DetailComponent } from "./pages";
import { Authentication } from "../shared";

const routes: Routes = [
  { path: "employees", component: ListComponent, title: "Employee List" },
  { path: "employees/add", component: AddComponent, title: "Employee Add", canActivate: [Authentication] },
  { path: "employees/detail/:id", component: DetailComponent, title: "Employee Detail", canActivate: [Authentication] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
