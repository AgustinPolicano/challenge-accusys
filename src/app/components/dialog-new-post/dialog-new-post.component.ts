import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LogicService } from 'src/app/service/logic-service.service';

@Component({
  selector: 'dialog-new-post',
  templateUrl: './dialog-new-post.component.html',
  styleUrls: ['./dialog-new-post.component.scss']
})
export class DialogNewPostComponent implements OnInit {
  dataId: any;
  form = this.fb.group({
    title: '',
    body: '',
    userId: Math.floor(Math.random() * 100)
  });


  constructor(private fb: FormBuilder, private http: HttpClient, private logic: LogicService, public dialog: MatDialog) {

  }

  ngOnInit() {
  }

 /*  Uso el metodo post para mandar el formArray, seguido a eso me suscribo a los cambios y hago una arrow
  function que se encargue de pasarle los valores del array a mi variable y esta la muestro en un alert, 
  una vez mostrado el alert se cierra el dialog */

  enviarPost() {
    try {
      this.http.post('https://jsonplaceholder.typicode.com/posts', this.form.value).subscribe(
        resultado => {
          this.dataId = resultado;
          console.log(this.dataId);
          alert('Su id de post es ' + this.dataId.id )
          return this.dialog.closeAll()
        }
        
      )
    } catch (error) {
      console.error(error);
    }
  }

}
