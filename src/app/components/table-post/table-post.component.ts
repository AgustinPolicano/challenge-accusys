import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { LogicService } from 'src/app/service/logic-service.service';
import { DialogNewPostComponent } from '../dialog-new-post/dialog-new-post.component';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';

@Component({
  selector: 'table-post',
  templateUrl: './table-post.component.html',
  styleUrls: ['./table-post.component.scss']
})
export class TablePostComponent implements OnInit {
  dataSource = new MatTableDataSource<Post>();
  userId!: number;
  idFiltro = new FormControl();
  bgHandler!: number;
  valoresFiltrados = {
    id: ''
  };
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @HostBinding('class') componentCssClass: any;


  constructor(private logic: LogicService, public dialog: MatDialog, private http: HttpClient, public overlayContainer: OverlayContainer,
    private elementRef: ElementRef) {
    this.bgHandler = 1;
    this.componentCssClass = 'light-theme';
  }


  //Funcion creada para que los datos de la tabla sean los que llegan del LogicService 

  ngOnInit(): void {
    this.getPost();
    //Metodo para filtrar por ID
    this.idFiltro.valueChanges.subscribe(positionFilterValue => {
      this.valoresFiltrados['id'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.valoresFiltrados);
    });
    this.dataSource.filterPredicate = this.filtroCustom();

    this.dataSource.paginator = this.paginator;
    //Traduccion del paginator a ES
    this.paginator._intl.itemsPerPageLabel = "Posts por pagina";
    this.paginator._intl.nextPageLabel = "Proxima pagina";
    this.paginator._intl.previousPageLabel = "Pagina anterior";
    this.paginator._intl.lastPageLabel = "Ultima pagina";
    this.paginator._intl.firstPageLabel = "Primera pagina";
    this.paginator._intl.getRangeLabel = this.rangoLabel;
  }




  filtroCustom() {
    const filtroDedicado = (data: Post, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.id.toString().trim().indexOf(searchString.id) !== -1
    }
    return filtroDedicado;
  }

  /*   Obtengo la data del userId y la igualo a una variable, 
    llamo a la funcion del get y le paso la data al DialogPostComponent */

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

  //Dialog para el nuevo Post

  dialogPostNew() {
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

  /* Llamo a la funcion de la logic que se encarga del get y le paso el array que devuelve al dataSource de la mat-table,
  tambien inicializo el sort */

  getPost() {
    this.logic.getPost().subscribe(
      datos => {
        this.dataSource.data = datos;
        this.dataSource.sort = this.sort;
      }
    );
  }

  /*   Obtengo la data de los coments con el userId que handleo en el dialog de dialog openDialog() */

  getComments(): Observable<Post[]> {
    let commentsApi = 'https://jsonplaceholder.typicode.com/posts/' + this.userId + '/comments'
    return this.http.get<Post[]>(commentsApi);
  }

  /*  Funcion que se encarga de cambiar de themes de mat-angular, ademas como no logre aplicarle background body desde la misma theme de
   angular handlee una logica que se encarga de cambiar el body desde elementRef */

  onSetTheme(e: string) {
    this.bgHandler++
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
    if (this.bgHandler % 2 == 0) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#212121';
    } else {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff8e1';
    }

  }

}

