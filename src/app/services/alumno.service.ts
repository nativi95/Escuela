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

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que envia una peticion GET para recuperar todos los registros de alumnos
     */
  GetAlumnos(): Observable<any> {
    return this.http.get(this.URL_BASE + 'alumnos');
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param id identificador del alumnos
     * metodo que envia una peticion GET para recuperar un registro de alumnos
     */
  GetAlumno(id): Observable<any> {
    return this.http.get(this.URL_BASE + 'alumnos/' + id);
  }
  //#endregion

  //#region Opciones

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que establece las opciones
     */
  httpOption = {
    header: new HttpHeaders(
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
  };
  //#endregion

  //#region Handle errores
  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo imprime los errores
     */
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

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param item recupera la estructura y la informacion para insertar
     * metodo que envia una peticion POST para insertar un registro
     */
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

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param id identificador del alumnos
     * @param item recupera la estructura y la informacion para actualizar
     * metodo que envia una peticion PUT para actualizar un registro
     */
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

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param id identificador del alumnos
     * metodo que envia una peticion DELETE para eliminar un registro
     */
 DeleteAlumno(id)
  {
    return this.http.delete<Alumno>(
      this.URL_BASE+"alumnos/"+id,
      this.httpOption)
    .pipe(retry(2), catchError(this.HandleError));
  }
  //#endregion
}
