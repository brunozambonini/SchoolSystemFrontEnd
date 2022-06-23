import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: Student;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Student,
    public dialogRef: MatDialogRef<Student>,
  ) {}
  
  ngOnInit(): void {
    if(this.data.id != 0){
      this.isChange = true;
    } else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
