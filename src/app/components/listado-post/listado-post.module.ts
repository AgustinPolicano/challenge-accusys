import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { ListadoPostComponent } from './listado-post.component';
import { TablePostComponent } from './table-post/table-post.component';


@NgModule({
    declarations: [ListadoPostComponent, TablePostComponent],
    imports: [
        BrowserModule,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule
    ],
    exports: [ListadoPostComponent],
    providers: [],
})
export class ListadoPostModule { }
