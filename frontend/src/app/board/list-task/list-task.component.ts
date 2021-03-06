import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  public tasksData: any;
  public successMsg: String;
  public errorMsg: String;

  constructor(private board: BoardService, private router: Router) {

    this.tasksData = {};
    this.successMsg = '';
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.board.listTask().subscribe(
      (res) => {
        console.log(res);
        this.tasksData = res.board;

      },
      (err) => {
        console.log(err.error);
        this.errorMsg = err.error;
        this.closeAlert();

      }
    )
  }

  updateTask(task: any, status: String) {
    const tempStatus = task.status;
    task.status = status;

    this.board.updateTask(task).subscribe(
      (res) => {
        task.status = status;
      },
      (err) => {
        task.status = tempStatus;
        this.errorMsg = err.error;
        this.closeAlert();
      }
    )
  }

  deleteTask(task: any) {
    this.board.deleteTask(task).subscribe(
      (res) => {
        const index = this.tasksData.indexOf(task);

        if (index > -1) {
          this.tasksData.splice(index, 1);
          this.successMsg = 'Task delete successfuly';
          this.closeAlert();
        }

      },
      (err) => {
        this.errorMsg = err.error;
        this.closeAlert();

      }
    )
  }

  closeAlert() {
    setTimeout(() => {
      this.successMsg = '';
      this.errorMsg = '';
    }, 3000);
  }

  closeX() {
    this.successMsg = '';
    this.errorMsg = '';
  }

}
