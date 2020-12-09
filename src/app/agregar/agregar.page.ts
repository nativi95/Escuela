import { Alumno } from './../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  formCreate: FormGroup;
  private formProcess: Alumno;

  private const SUCCESS="success";
  private const DANGER="danger";

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alumnoService: AlumnoService
  ) {
    this.formCreate = this.createForm();
    this.formProcess = new Alumno();
  }

  private createForm() {
    return this.formBuilder.group({
      Nombre: ["", Validators.required],
      Apellidos: ["", Validators.required],
      Carnet: ["", Validators.required]
    });
  }

  CreateAlumno() {
    this.formProcess = this.formCreate.value;
    console.log(this.formProcess)
    this.alumnoService.CreateAlumno(this.formProcess).subscribe(result => {
      console.log(result);
      if (result['status'] == this.SUCCESS) {
        this.presentToast(result['message'], this.SUCCESS);
      }
      else {
        this.presentToast(result['message'], this.DANGER);
      }
      //limpiar formularios
      this.formCreate = this.createForm();
    })
  }

  async presentToast(msj: string, style: string) {
    const TOAST = await this.toastCtrl.create(
      {
        message: msj,
        duration: 3000,
        color: style,
        position: "middle"
      }
    );
    TOAST.present();
  }

  ngOnInit() {
  }

}
