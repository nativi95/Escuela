import { AutorService } from './../services/autor.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo constructor que llena la informacion de la vista al iniciar
     */
  autores: Observable<any>;
  constructor(private autorService: AutorService) {
    this.autores = this.autorService.GetAutores();

  }
}

