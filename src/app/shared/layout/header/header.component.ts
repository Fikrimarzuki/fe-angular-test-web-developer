import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { CookieService } from "ngx-cookie-service";
import Swal from "sweetalert2";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent {
  faUser = faUser;
  faBars = faBars;

  @Input() isCollapse = false;
  @Output() onToggleSidebar = new EventEmitter<any>();

  constructor(
    private _router: Router,
    private cookieService: CookieService
  ) {}

  handleLoginButton() {
    this._router.navigate(["/login"])
  }

  handleToggleSidebar() {
    this.onToggleSidebar.emit()
  }

  getUserCookie() {
    if (this.cookieService.check("LOGIN_INFO")) return true
    else return false
  }

  handleLogout() {
    Swal.fire({
      title: "Log out",
      text: "Are you sure you want to log out?",
      icon: "info",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#3B82F6",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        this.cookieService.delete("LOGIN_INFO")
        this._router.navigate(["/"])
        window.location.reload()
      }
    })
  }
}