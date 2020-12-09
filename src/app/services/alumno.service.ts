import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Alumno} from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private readonly URL_BASE = "http://localhost/EscuelaServiceRest/";
  constructor(private http: HttpClient) { }

  //#region consultas Get
  GetAlumnos(): Observable<any> {
    return this.http.get(this.URL_BASE + 'alumnos');
  }

  GetAlumno(id): Observable<any> {
    return this.http.get(this.URL_BASE + 'alumnos/' + id);
  }
  //#endregion

  //#region Opciones
  httpOption = {
    header: new HttpHeaders(
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
  };
  //#endregion

  //#region Handle errores
  
  HandleError(error:HttpErrorResponse)
  {
    if(error.error instanceof ErrorEvent)
    {
      console.error("Ha ocurrido un error", error.error.message)
    }
    else
    {
      console.error(
        `El backend retorno un codigo ${error.status},`+
        `el contenido del error es: ${error.error}`
      )
    }
    return throwError("Algo no salio muy bien, intenta nuevamente o mas tarde")
  }
  //#endregion

  //#region Insert
  CreateAlumno(item): Observable<Alumno>
  {
    return this.http.post<Alumno>(
      this.URL_BASE+"alumnos",
      JSON.stringify(item), 
      this.httpOption)
    .pipe(retry(2), catchError(this.HandleError));
  }
  //#endregion
 
  //#region Update
  UpdateAlumno(id, item): Observable<Alumno>
  {
    return this.http.put<Alumno>(
      this.URL_BASE+"alumnos/"+id,
      JSON.stringify(item), 
      this.httpOption)
    .pipe(retry(2), catchError(this.HandleError));
  }
  //#endregion

  //#region Delete
 DeleteAlumno(id)
  {
    return this.http.delete<Alumno>(
      this.URL_BASE+"alumnos/"+id,
      this.httpOption)
    .pipe(retry(2), catchError(this.HandleError));
  }
  //#endregion
}
