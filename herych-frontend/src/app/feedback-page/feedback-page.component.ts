import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../model/Comment";
import Swal from "sweetalert2";
import {User} from "../../model/User";

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./../main-page/main-page.component.css','./../main-page/Login-Form-Basic-icons.css','./../main-page/Articles-Badges-images.css']
})
export class FeedbackPageComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.refreshComments();
    this.http.get<User>('/api/personal_information').subscribe(
      data => {
        this.isAdmin = data.admin;
      }
    )
  }

  comments: Comment[] = [];
  title: string = '';
  content: string = '';
  moreComments: boolean = true;
  page: number = 0;
  isAdmin: boolean = false;

  async refreshComments(page: number = this.page){
    await this.http.get<Comment[]>('/api/comment/' + page + '/12').subscribe(
      data => {
        this.moreComments = true;
        if(data.length == 0){
          this.moreComments = false;
        }
        else{
          data.forEach(comment => {
            comment.content = comment.content.replace(/\n/g, '<br>');
          });
          if(page == 0){
            this.comments = data;
          }
          else{
            this.comments.push(...data);
          }
          this.page = page + 1;
        }
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
    );
  }

  simpleButtonNavigate(link: string){
    this.router.navigate([link], {relativeTo: this.route});
  }

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
          this.refreshComments(0);
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

  comingSoonMessage() {
    Swal.fire({
      icon: 'error',
      text: 'Coming soon',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
