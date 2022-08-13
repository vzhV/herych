import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css','./Login-Form-Basic-icons.css','./Pretty-Registration-Form-.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  username: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  repeat_password: string = '';
  acceptedTerms: boolean = false;

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }

  signUp() {
    if (this.username.length == 0 || this.email.length == 0 || this.first_name.length == 0 || this.last_name.length == 0 || this.password.length == 0 || this.repeat_password.length == 0) {
      Swal.fire({
        title: 'Error',
        text: 'All fields are required',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    } else if (this.password != this.repeat_password) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    } else if(this.password.length < 8){
      Swal.fire({
        title: 'Error',
        text: 'Password must be at least 8 characters',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      let body = JSON.stringify({username: this.username, email: this.email, firstName: this.first_name, lastName: this.last_name, password: this.password});
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
      }
      this.http.post('/api/user/sign-up', body, httpOptions).subscribe(() => {
        console.log('hello there ' + this.username);
        this.username = '';
        this.email = '';
        this.first_name = '';
        this.last_name = '';
        this.password = '';
        this.repeat_password = '';
        this.router.navigate(['/login'], {relativeTo: this.route});
      }, (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Try again with another credentials',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      });
    }
  }

  termsAndConditions() {
    Swal.fire({
      title: 'Terms and Conditions',
      html:
        '1) Ніколи не передавайте паролі другим особам.<br>' +
        '2) Бля сайт робився дуже швидко так шо ніяких хуйових коментів чути не хочу.<br>' +
        '3) Якщо ви забудете пароль то ви можете його відновити ( но я хз чи мені буде не впадло це реалізувати )<br>' +
        '4) Якщо маєте пропозиції щодо нової хуйні, перейдіть по силкам в нижній частині сайту і напишіть в приватні повідомлення <br>' +
        '5) Якщо дуже подобається сайт, то задонатьте по братськи <br>' +
        '6) Якщо щось не подобається то мені похуй <br>' +
        'Як умру, то поховайте<br>' +
        '\n' +
        'Мене на могилі<br>' +
        '\n' +
        'Серед степу широкого<br>' +
        '\n' +
        'На Вкраїні милій,<br>' +
        '\n' +
        'Щоб лани широкополі,<br>' +
        '\n' +
        'І Дніпро, і кручі<br>' +
        '\n' +
        'Було видно, було чути,<br>' +
        '\n' +
        'Як реве ревучий.<br>' +
        '7) Ну до цього пункту ви не дойшли, так шо скажу від всіх шо я красава <br>',
      confirmButtonText: 'Згоден/а',
      confirmButtonColor: '',
    }).then((result) => {
      if(result.isConfirmed){
        this.signUp();
      }
    });
  }

}
