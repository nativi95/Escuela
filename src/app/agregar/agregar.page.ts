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

  private readonly SUCCESS="success";
  private readonly DANGER="danger";

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo constructor que inicia el formulario y la variable que se procesara
     */
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alumnoService: AlumnoService
  ) {
    this.formCreate = this.createForm();
    this.formProcess = new Alumno();
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que define la estructura de el Form
     */
  private createForm() {
    return this.formBuilder.group({
      Nombre: ["", Validators.required],
      Apellidos: ["", Validators.required],
      Carnet: ["", Validators.required]
    });
  }

   /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que direcciona la informacion al servicio para poder crear un alumno, imprime en pantalla el resultado de la peticion
     */
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

   /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param msj mensaje a imprimir
     * @param style establece el color del color del toast
     * metodo que imprime en pantalla un mensaje TOAST
     */

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
