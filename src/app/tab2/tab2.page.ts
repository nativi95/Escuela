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
  constructor(private alumnoService: AlumnoService, private route: Router) {
    this.alumnos = this.alumnoService.GetAlumnos();
  }

  GoCreate() {
    this.route.navigateByUrl("agregar");
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.LoadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async LoadData(){
    this.alumnos = this.alumnoService.GetAlumnos();
  }

  ngOnInit() { }

}
