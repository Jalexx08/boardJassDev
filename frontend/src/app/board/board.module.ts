import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveTaskComponent } from './save-task/save-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SaveTaskComponent,
    ListTaskComponent
  ],
  exports: [
    SaveTaskComponent,
    ListTaskComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class BoardModule { }
