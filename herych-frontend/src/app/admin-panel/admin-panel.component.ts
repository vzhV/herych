import { Component, OnInit } from '@angular/core';
import {ColorPickerControl} from "@iplab/ngx-color-picker";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {Author} from "../../model/Author";
import {Label} from "../../model/Label";
import {Fact} from "../../model/Fact";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public backgroundControl = new ColorPickerControl();
  public textColorControl = new ColorPickerControl();
  users: Author[] = [];
  facts: Fact[] = [];
  selectedUsers: Author[] = [];
  selectAll: boolean = false;
  first = 0;
  rows = 10;
  selectedUser : Author = {id: 0, username: '',email: '', firstName: '',lastName: '', roles: []};
  displayEditModal: boolean = false;
  selectedNewRole: Label = {id: 0, name: '', background_color: '', text_color: ''};
  allLabels: Label[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  roleName: string = 'Role';
  current_mode: number = 0;
  displayModal: boolean = false;

  addRoleModalText: string = 'Role has been created!';
  factContent: string = 'Fact content';


  ngOnInit(): void {
    this.backgroundControl.setValueFrom("#E69AC0")
    this.textColorControl.setValueFrom("#000000")
    Swal.fire({
      icon: 'info',
      text: 'This page is not compatible with mobile devices!' +
        '\nFor better experience, please use a desktop version.',
      showConfirmButton: true
    })
    this.refreshUsers();
    this.refreshFacts();
  }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
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
      this.http.post('/api/role', body, this.httpOptions).subscribe(
        data => {
            this.displayModal = true;
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
  saveFact(){
    if(this.factContent.length == 0){
      Swal.fire({
        icon: 'error',
        text: 'Fact content is required!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      let body = JSON.stringify({fact: this.factContent});
      this.http.post('/api/fact', body, this.httpOptions).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            text: 'Fact has been added!',
            showConfirmButton: false,
            timer: 1500
          })
          this.factContent = '';
          this.refreshFacts();
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
              text: 'This fact already exists!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      );
    }
  }

  async refreshFacts(){
    await this.http.get<Fact[]>('/api/fact/all').subscribe(
      data => {
        this.facts = data;
      }
    );
  }

  async refreshUsers(){
    this.http.get<Author[]>('/api/user/all').subscribe(
      data => {
        this.users = data;
      }
    );
  }


  backToProfile(){
    this.router.navigate(['/'], {relativeTo: this.route});
  }

  next(){
    this.first += this.rows;
  }

  previous(){
    this.first -= this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean{
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean{
    return this.users ? this.first === 0 : true;
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.users.length;
    this.selectedUsers = value;
    console.log(this.selectedUsers);
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.selectedUsers = [...this.users];
    }
    else {
      this.selectedUsers = [];
      this.selectAll = false;
    }
    console.log(this.selectedUsers);
  }

  onHideModal(){
    Swal.fire({
      icon: 'success',
      text: this.addRoleModalText,
      showConfirmButton: false,
      timer: 1500
    });
    this.selectedUsers = [];
    this.roleName = 'Role';
    this.addRoleModalText = 'Role has been created!';
    this.selectAll = false;
  }

  async assignRole(){
    await this.selectedUsers.forEach(user => {
      let body = JSON.stringify({username: user.username, roleName: this.roleName});
      this.http.post('/api/user/role', body, this.httpOptions).subscribe(
        data => {

        }
      );
    });
    this.addRoleModalText = 'Role has been assigned to selected users!';
    this.displayModal = false;
  }

  async editRoleListModal(user: Author){
    this.selectedUser = user;
    await this.http.get<Label[]>('/api/role').subscribe(
      data => {
        this.allLabels = data;
        this.selectedNewRole = this.allLabels[0];
      }
    );
    this.displayEditModal = true;
  }

  assignRoleToUser(){
    let body = JSON.stringify({username: this.selectedUser.username!, roleName: this.selectedNewRole.name});
    this.http.post('/api/user/role', body, this.httpOptions).subscribe(
      data => {
        this.refreshUsers();
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

  removeRoleFromUser(rolename: Label){
    let body = JSON.stringify({username: this.selectedUser.username!, roleName: rolename.name});
    this.http.post('/api/user/role/delete', body, this.httpOptions).subscribe(
      data => {
        this.refreshUsers();
      }
    );
  }

  deleteFact(id: number){
    this.http.delete('/api/fact/' + id).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          text: 'Fact has been deleted!',
          showConfirmButton: false,
          timer: 1500
        });
        this.refreshFacts();
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
            text: 'Fact has not been deleted!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    );
  }
}
