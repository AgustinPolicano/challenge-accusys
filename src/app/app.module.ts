import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogNewPostComponent } from './components/dialog-new-post/dialog-new-post.component';
import { DialogPostComponent } from './components/dialog-post/dialog-post.component';
import { HeaderPostComponent } from './components/header-post/header-post.component';
import { ListadoPostModule } from './components/listado-post/listado-post.module';

@NgModule({
  declarations: [
    AppComponent, DialogPostComponent, HeaderPostComponent, DialogNewPostComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ListadoPostModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
