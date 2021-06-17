import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {

  public taskData: any;
  public errorMsg: String;

  constructor() {
    this.taskData = {};
    this.errorMsg = '';
  }

  ngOnInit(): void {
  }
  saveTask() { }

  closeAlert() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000);
  }

  closeX() {
    this.errorMsg = '';
  }

}
