import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {

  public taskData: any;
  public errorMsg: String;
  public selectedFile: any;

  constructor( private boardService: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMsg = '';
    this.selectedFile = null;
  }

  ngOnInit(): void {
  }

  saveTask() {
    if (!this.taskData.name || !this.taskData.description) {
      console.log('Incomplete data');
      this.errorMsg = 'Incomplete data';
      this.closeAlert();

    } else {
      this.boardService.saveTask(this.taskData).subscribe(
        (res: any) => {
          console.log(res);
          // localStorage.setItem('token', res.jwtToken);
          this.taskData = {};
          this.router.navigate(['/listTask']);

        },
        (err) => {

          console.log(err);
          this.errorMsg = err.error;
          this.closeAlert();

        }
      );
    }
  }

  uploadImg(e : any ){
    console.log(e);
    this.selectedFile = <File>e.target.files[0];
    
  }

  saveTaskImg() {

    if  (!this.taskData.name || !this.taskData.description) {
      console.log('Failed process: Incomplete data');
      this.errorMsg = 'Failed process: Incomplete data';
      this.closeAlert();
      
    } else {
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name );
      data.append('name', this.taskData.name);
      data.append('description', this.taskData.description);
      this.boardService.saveTaskImg(data).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/listTask']);
          
        },
        (err)=> {
          console.log(err.error);
          this.errorMsg = err.error;
          this.closeAlert();
          
          
        }
      );
      
    }

  }

  closeAlert() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000);
  }

  closeX() {
    this.errorMsg = '';
  }

}
