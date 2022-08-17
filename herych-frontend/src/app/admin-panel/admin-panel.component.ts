import { Component, OnInit } from '@angular/core';
import {ColorPickerControl} from "@iplab/ngx-color-picker";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public backgroundControl = new ColorPickerControl();
  public textColorControl = new ColorPickerControl();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  roleName: string = 'Role';
  current_mode: number = 0;

  ngOnInit(): void {
    this.backgroundControl.setValueFrom("#E69AC0")
    this.textColorControl.setValueFrom("#000000")
    Swal.fire({
      icon: 'info',
      text: 'This page is not compatible with mobile devices!' +
        '\nFor better experience, please use a desktop version.',
      showConfirmButton: true
    })

  }

  public get backgroundColor(): string {
    return this.backgroundControl.value.toHexString();
  }

  public get textColor(): string {
    return this.textColorControl.value.toHexString();
  }

  public get role(): string {
    return this.roleName;
  }

  saveRole(){
    if(this.roleName.length == 0){
      Swal.fire({
        icon: 'error',
        text: 'Role name is required!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      let body = JSON.stringify({name: this.role, background_color: this.backgroundColor, text_color: this.textColor});
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
      }
      this.http.post('http://localhost:8080/api/role', body, httpOptions).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            text: 'Role added successfully!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error => {
          if(error.valueOf().status == 500){
            Swal.fire({
              icon: 'error',
              text: 'Your session has expired! Please log in again!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else{
            Swal.fire({
              icon: 'error',
              text: 'Role with this name already exists!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      );
    }
  }

  backToProfile(){
    this.router.navigate(['/'], {relativeTo: this.route});
  }

}
