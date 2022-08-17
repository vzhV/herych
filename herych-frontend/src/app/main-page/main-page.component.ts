import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {Comment} from "../../model/Comment";


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

  ngOnInit(): void {
    this.http.get<Comment[]>('http://localhost:8080/api/comment/0/3').subscribe(
      data => {
        this.comments = data;
        this.comments.forEach(comment => {
          comment.content = comment.content.replace(/\n/g, '<br>');
        });
        console.log(this.comments);
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
      this.http.post('http://localhost:8080/api/comment', body).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            text: 'Comment posted!',
            showConfirmButton: false,
            timer: 1500
          })
          this.title = '';
          this.content = '';
        }
      )
    }
  }

}
