import { AutorService } from './../services/autor.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  autores: Observable<any>;
  constructor(private autorService: AutorService) {
    this.autores = this.autorService.GetAutores();
  }

  

}

