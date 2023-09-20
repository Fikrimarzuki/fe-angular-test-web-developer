import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'mandiri-fe';
  public isSidebarCollapse = true;

  toggleSidebar() {
    console.log("triggerererer");
    
    this.isSidebarCollapse = !this.isSidebarCollapse
  }
}
