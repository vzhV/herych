import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {Comment} from "../../model/Comment";
import {Fact} from "../../model/Fact";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css','./Login-Form-Basic-icons.css','./Articles-Badges-images.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  userId: number = 0;
  userName: string = '';
  comments: Comment[] = [];
  fact: Fact = {id: 0, fact: 'fact'}

  ngOnInit(): void {
    this.refreshComments();
    this.http.get<Fact>('/api/fact/random').subscribe(
      data => {
        this.fact = data == null ? {id: 0, fact: 'fact'} : data;
      }
    );
  }

  async refreshComments(){
    await this.http.get<Comment[]>('/api/comment/0/3').subscribe(
      data => {
        this.comments = data;
        this.comments.forEach(comment => {
          comment.content = comment.content.replace(/\n/g, '<br>');
        });
      }
    );
  }

  title: string = '';
  content: string = '';

  postComment(){
    if(this.title.length == 0 || this.content.length == 0){
      Swal.fire({
        icon: 'error',
        text: 'Title and content are required!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if(this.title.replace(/\s/g, '').length == 0 || this.content.replace(/\s/g, '').length == 0){
      Swal.fire({
        icon: 'error',
        text: 'Title and content are required!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      const body = new HttpParams()
        .set('title', this.title)
        .set('content', this.content);
      this.http.post('/api/comment', body).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            text: 'Comment posted!',
            showConfirmButton: false,
            timer: 1500
          })
          this.refreshComments();
          this.title = '';
          this.content = '';
        },
      error => {
          if(error.url.valueOf().includes('login')){
            Swal.fire({
              icon: 'error',
              text: 'Your session has expired! Please login again!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      )
    }
  }

  logout(){
    this.http.post('/logout', null).subscribe(
      data => {
        this.router.navigate(['/login'], {relativeTo: this.route});
      }
    );
  }

  simpleButtonNavigate(link: string){
    this.router.navigate([link], {relativeTo: this.route});
  }

}
