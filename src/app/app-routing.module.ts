import { NgModule } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./not-found.component";
import { EmployeesModule } from './employees';

const AuthGuard: CanActivateFn = () => {
  return false
}

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "employees",
    loadChildren: () => EmployeesModule,
    canActivate: [AuthGuard],
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
