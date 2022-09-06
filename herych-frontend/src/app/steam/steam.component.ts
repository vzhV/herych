import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-steam',
  templateUrl: './steam.component.html',
  styleUrls: ['./steam.component.css']
})
export class SteamComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.http.get<Object[]>('https://api.opendota.com/api/players/836644455/recentMatches').subscribe(
      data =>{
        console.log(data);
      }
    );
  }

}
