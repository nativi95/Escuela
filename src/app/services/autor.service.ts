import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private readonly URL_BASE = "http://localhost/EscuelaServiceRest/";
  constructor(private http: HttpClient) { }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que envia una peticion GET para recuperar la informaicon de los autores
     */
 public GetAutores(): Observable<any> {
    return this.http.get(this.URL_BASE + 'autores');
  }
}
