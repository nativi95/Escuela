import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AlumnoService} from '../sevices/alumno.service';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  alumnos: Observable<any>;
  constructor(private alumnoService: AlumnoService, private route: Router) {
    this.alumnos=this.alumnoService.GetAlumnos();
  }


  ngOnInit(){}

}
