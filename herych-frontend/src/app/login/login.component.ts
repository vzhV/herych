import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './Login-Form-Basic-icons.css']
})

export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  username: string = '';
  password: string = '';

  ngOnInit(): void {

  }

  goToSignUp() {
    this.router.navigate(['/sign-up'], {relativeTo: this.route});
  }

  login() {
    if (this.username.length == 0 || this.password.length == 0) {
      Swal.fire({
        title: 'Error',
        text: 'Username or password is empty',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      const body = new HttpParams()
        .set('username', this.username)
        .set('password', this.password);
      this.http.post('/api/user/login', body).subscribe(() => {
        console.log('hello there ' + this.username);
        this.username = '';
        this.password = '';
      }, (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Username or password is incorrect',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      });
    }
  }
}
