import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.css']
})
export class SimpleButtonComponent implements OnInit {

  @Input()
  textButton: string = ''

  @Input()
  active: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
