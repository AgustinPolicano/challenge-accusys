import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.scss']
})
export class DialogPostComponent implements OnInit {
  datosComments: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.datosComments = this.data;
  }

}
