import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { DashboardComponent, LoginComponent } from "./pages";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [DashboardComponent, LoginComponent]
})
export class HomeModule {}