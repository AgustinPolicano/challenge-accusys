import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { LogicService } from 'src/app/service/logic-service.service';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';

@Component({
  selector: 'table-post',
  templateUrl: './table-post.component.html',
})
export class TablePostComponent implements OnInit {
  dataSource = new MatTableDataSource<Post>();
  userId!: number;
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  constructor(private logic: LogicService, public dialog: MatDialog, private http: HttpClient) { }


  //Funcion creada para que los datos de la tabla sean los que llegan del LogicService 

  ngOnInit(): void {
    this.logic.getPost().subscribe(
      datos => this.dataSource.data = datos
    );
  }

  openDialog(post: Post) {
    this.userId = post.userId;
    const dialogRef = this.dialog.open(DialogPostComponent, {
      data: this.getComments().subscribe(
        datos => console.log(datos)
      )
    });
  }

  getComments(): Observable<Post[]> {
    let commentsApi = 'https://jsonplaceholder.typicode.com/posts/' + this.userId + '/comments'
    return this.http.get<Post[]>(commentsApi);
  }

}
