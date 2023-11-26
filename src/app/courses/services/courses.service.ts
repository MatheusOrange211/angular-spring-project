import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
    ) {}
  list(){
      return this.httpClient.get<Course[]>(this.API).pipe(
        catchError(
          error =>{
            this.onError('Erro ao carregar cursos!');
            return of([]);
          }
        )
      );
  }

  onError(errormsg:string){
    this.dialog.open(ErrorDialogComponent, {
      data: errormsg
    })
  }
}
