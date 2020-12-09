import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private readonly URL_BASE = "http://localhost/EscuelaServiceRest/";
  constructor(private http: HttpClient) { }

 public GetAutores(): Observable<any> {
    return this.http.get(this.URL_BASE + 'autores');
  }
}
