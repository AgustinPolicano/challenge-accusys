import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Post, PostComments } from 'src/app/models/post.model';

@Component({
  selector: 'dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.scss']
})
export class DialogPostComponent implements OnInit {
  datosComments!: any;
  displayedColumns = ['name', 'email', 'postId', 'id', 'body'];
  dataSource = new MatTableDataSource<PostComments>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dataSource.data = this.data
    console.log(this.dataSource.data);
  }

}
