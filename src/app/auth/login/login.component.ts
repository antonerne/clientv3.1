import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = '';
  redirectUrl = "";
  verifyToken = '';
  resetToken = '';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(30),
  ])

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    }) 
  }

  ngOnInit(): void {
  }
  
  login() {
    this.loginError = '';
    this.authService.showProgress = true;
    this.authService.statusMessage = "Logging In";
    this.authService.login(this.email.value,
      this.password.value)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Logged In";
          var user = this.authService.getUser();
          if (user) {
            this.menuService.getMenus(user.roles);
          }
          if (this.authService.mustChange) {
            this.router.navigate(["/mustchange"]);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.authService.showProgress = false;
          if (error.error.message === "Account Not Verified") {
            this.authService.statusMessage = error.error.message
              + ": Check email for verification message";
            this.authService.currentEmail = this.email.value;
            this.router.navigate(['/verify']);
          } else {
            this.authService.statusMessage = "Login Error"
            if (error.error.error) {
              this.loginError = error.error.error;
            } else if (error.error.message) {
              this.loginError = error.error.message;
            }
          }
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async forgotPassword() {
    if (this.email.value !== "") {
      this.authService.currentEmail = this.email.value;
      this.authService.showProgress = true;
      this.authService.sendForgot(this.email.value)
        .subscribe({
          next: (data) => {
            this.loginError = "";
            this.authService.showProgress = false;
            this.authService.statusMessage = data.message;
            this.router.navigate(['/forgot']);
          },
          error: (error) => {
            this.authService.showProgress = false;
            if (error.error.message) {
              this.loginError = error.error.message;
              this.authService.statusMessage = "Forgot Password Request Failure";
            }
          }
        })
    } else {
      this.loginError = "You must provide your email address";
      this.authService.statusMessage = "Error Reported";
    }
  }
}
