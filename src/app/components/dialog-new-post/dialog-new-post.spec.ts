/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DialogNewPostComponent } from './dialog-new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



describe('DialogNewPostCOmponent', () => {
  let component: DialogNewPostComponent;
  let fixture: ComponentFixture<DialogNewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            HttpClientTestingModule,
            MatDialogModule
          ],
      declarations: [ DialogNewPostComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
