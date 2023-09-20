import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent, LoginComponent } from "./pages";
import { Authentication } from "../shared";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent, canActivate: [Authentication] }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}