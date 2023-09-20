import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EmployeeService } from "./services";

@NgModule({
  imports: [],
  providers: [EmployeeService],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("You should import core module ony in the root module")
    }
  }
}