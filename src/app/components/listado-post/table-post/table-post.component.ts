import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { LogicService } from 'src/app/service/logic-service.service';
import { DialogNewPostComponent } from '../../dialog-new-post/dialog-new-post.component';
import { DialogPostComponent } from '../../dialog-post/dialog-post.component';

@Component({
  selector: 'table-post',
  templateUrl: './table-post.component.html',
})
export class TablePostComponent implements OnInit {
  dataSource = new MatTableDataSource<Post>();
  userId!: number;
  idFiltro = new FormControl();
  valoresFiltrados = {
    id: ''
  };
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private logic: LogicService, public dialog: MatDialog, private http: HttpClient) {

  }


  //Funcion creada para que los datos de la tabla sean los que llegan del LogicService 

  ngOnInit(): void {
    this.getPost();
    this.idFiltro.valueChanges.subscribe(positionFilterValue => {
      this.valoresFiltrados['id'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.valoresFiltrados);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.paginator = this.paginator;
    //Traduccion del paginator a ES
    this.paginator._intl.itemsPerPageLabel = "Posts por pagina";
    this.paginator._intl.nextPageLabel = "Proxima pagina";
    this.paginator._intl.previousPageLabel = "Pagina anterior";
    this.paginator._intl.lastPageLabel = "Ultima pagina";
    this.paginator._intl.firstPageLabel = "Primera pagina";
    this.paginator._intl.getRangeLabel = this.rangoLabel;
  }


  customFilterPredicate() {
    const myFilterPredicate = (data: Post, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.id.toString().trim().indexOf(searchString.id) !== -1
    }
    return myFilterPredicate;
  }




  openDialog(post: Post) {
    this.userId = post.userId;
    this.getComments().subscribe(
      datos => {
        this.dialog.open(DialogPostComponent, {
          data: datos
        })
      }
    )
  }

  dialogPostNew(){
    this.dialog.open(DialogNewPostComponent)
  }


  //Funcion que se encarga de mostrar el rango en español
  rangoLabel(page: number, pageSize: number, length: number) {
    if (length == 0 || pageSize == 0) { return `0 De ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} De ${length}`;
  }

  getPost() {
    this.logic.getPost().subscribe(
      datos => {
        this.dataSource.data = datos;
        this.dataSource.sort = this.sort;
      }
    );
  }

  getComments(): Observable<Post[]> {
    let commentsApi = 'https://jsonplaceholder.typicode.com/posts/' + this.userId + '/comments'
    return this.http.get<Post[]>(commentsApi);
  }




}
