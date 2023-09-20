import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faBars, faUsers, faHome, faHouseUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  faBars = faBars;
  faUsers = faUsers;
  faHome = faHome;
  faHouseUser = faHouseUser;

  @Input() isCollapse = false;
  @Output() onToggleSidebar = new EventEmitter<any>();

  toggleSidebar() {
    this.onToggleSidebar.emit()
  }
  menus = [
    { title: "Dashboard", to: "dashboard", icon: faHome },
    { title: "Employees", to: "employees", icon: faUsers },
  ]
}