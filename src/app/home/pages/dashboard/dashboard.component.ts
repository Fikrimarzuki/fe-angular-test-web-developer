import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  username = ""
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    if (this.cookieService.check("LOGIN_INFO")) {
      this.username = JSON.parse(this.cookieService.get("LOGIN_INFO")).username
    }
  }
}
