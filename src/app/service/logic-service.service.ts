import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TablePostComponent } from '../components/table-post/table-post.component';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})

export class LogicService {
  postApi = 'https://jsonplaceholder.typicode.com/posts'
  constructor(private http: HttpClient) {

  }

  //Obtengo toda la data mediante un GET

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postApi);
  }


}
