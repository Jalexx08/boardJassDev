import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveTaskComponent } from './save-task/save-task.component';
import { ListTaskComponent } from './list-task/list-task.component';



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
    CommonModule
  ]
})
export class BoardModule { }
