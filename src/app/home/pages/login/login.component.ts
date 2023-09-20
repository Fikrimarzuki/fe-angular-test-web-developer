import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  isError=false;
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private _router: Router
  ) {}

  handleLogin() {
    this.userService.getUsers()
    .subscribe(users => {
      const user = users.find(el => el.username === this.loginForm.value.username)
      if (user) {
        if (user.password === this.loginForm.value.password) {
          const payload = JSON.stringify({ id: user.id, username: user.username })
          this.isError = false
          this.cookieService.set("LOGIN_INFO", payload)
          this._router.navigate(["/dashboard"])
          return
        }
      }
      this.isError = true
    })
  }
}
