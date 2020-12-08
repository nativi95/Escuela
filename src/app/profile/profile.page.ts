import { AlumnoService } from './../sevices/alumno.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  alumno:any;
  constructor(private activatedRoute:ActivatedRoute, private alumnoService: AlumnoService) { }

  ngOnInit() {
    let id= this.activatedRoute.snapshot.paramMap.get('id');
    this.alumnoService.GetAlumno(id).subscribe(resultado => {this.alumno = resultado[0];});
  }

}
