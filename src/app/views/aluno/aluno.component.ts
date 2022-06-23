import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
  providers: [StudentService]
})
export class AlunoComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'matricula','actions'];
  dataSource!: Student[];

  constructor(
    public dialog: MatDialog,
    public studentService: StudentService
    ) {
        this.studentService.getStudents()
          .subscribe((data: Student[]) => {
            this.dataSource = data;
          });
     }

  ngOnInit(): void {
  }

  openDialog(element: Student | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: 0,
        nome: '',
        cpf: '',
        matricula: '',
      } : {
        id: element.id,
        nome: element.nome,
        cpf: element.cpf,
        matricula: element.matricula,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          const studentId = result.id;

          this.studentService.editStudent(result)
            .subscribe((data: Student) => {
              const index = this.dataSource.findIndex(p => p.id === studentId);
              this.dataSource[index] = result;
              this.table.renderRows();
            });
        } else{
          console.log(result);
          this.studentService.createStudent(result)
            .subscribe((data: Student) => {
              this.dataSource.push(result);
              this.table.renderRows();
            })
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.studentService.deleteStudent(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id)
      });
  }

  editElement(element: Student | null): void{
    this.openDialog(element);
  }

  applyFilter(filterValue: string){
    console.log(filterValue)
  }

  onKey(value: string) {
    if(value.length > 2){
      this.studentService.getStudentsFiltering(value)
          .subscribe((data: Student[]) => {
            this.dataSource = data;
          });
    }else if(value.length === 0){
      this.studentService.getStudents()
          .subscribe((data: Student[]) => {
            this.dataSource = data;
          });
    }
  }

  resetDataBase(number: number): void{
    console.log("Teste")
    this.studentService.resetDataBase()
      .subscribe(() => {
        this.dataSource = []
      });
  }
}
