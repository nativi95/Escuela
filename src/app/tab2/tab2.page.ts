import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoService } from '../services/alumno.service';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  alumnos: Observable<any>;
  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo constructor que llena la informacion de la vista al iniciar
     */
  constructor(private alumnoService: AlumnoService, private route: Router) {
    this.alumnos = this.alumnoService.GetAlumnos();
  }


  /**
     * @autor Juan Carlos Ruiz Nativi
     * metodo que direcciona a la pagina agregar
     */
  GoCreate() {
    this.route.navigateByUrl("agregar");
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param evento evento que permitira activar un metodo load
     * metodo reconoce un evento para poder refrescar la informacion
     */
  doRefresh(event) {
    console.log('Begin async operation');
    this.LoadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo refresca la informacion
     */
  async LoadData() {
    this.alumnos = this.alumnoService.GetAlumnos();
  }

  ngOnInit() { }

}
