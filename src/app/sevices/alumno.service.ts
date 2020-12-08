import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  GetAlumnos(): Observable<any>{
    return this.http.get('http://localhost/EscuelaServiceRest/alumnos');
  }

  GetAlumno(id): Observable<any>{
    return this.http.get('http://localhost/EscuelaServiceRest/alumnos/'+id);
  }
}
