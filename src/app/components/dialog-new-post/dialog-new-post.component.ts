import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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


  constructor(private fb: FormBuilder, private http: HttpClient, private logic: LogicService) {

  }

  ngOnInit() {
  }

  enviarPost() {
    try {
      this.http.post('https://jsonplaceholder.typicode.com/posts', this.form.value).subscribe(
        resultado => {
          this.dataId = resultado;
          console.log(this.dataId);
          return alert('Su id de post es ' + this.dataId.id )
        }
        
      )
    } catch (error) {
      console.error(error);
    }
  }

}
