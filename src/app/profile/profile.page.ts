import { Alumno } from './../models/alumno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../services/alumno.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private readonly SUCCESS = "success";
  private readonly DANGER = "danger";
  alumno;
  formUpdate: FormGroup;
  private formProcess;

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo constructor que inicia el formulario y la variable que se procesara
     */
  constructor(
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    public alertController: AlertController,
    public router: Router) {
    this.formUpdate = this.createForm();
    this.alumno = new Alumno();
    this.formProcess = new Alumno();

  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que define la estructura de el Form
     */
  private createForm() {
    return this.formBuilder.group({
      IdAlumno: ["", Validators.required],
      Nombre: ["", Validators.required],
      Apellidos: ["", Validators.required],
      Carnet: ["", Validators.required]
    });
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que direcciona la informacion al servicio para poder actualizar un alumno, imprime en pantalla el resultado de la peticion
     */
  UpdateAlumno() {
    this.formProcess = this.formUpdate.value;
    console.log(this.formUpdate.value);
    this.alumnoService.UpdateAlumno(this.formProcess['IdAlumno'], this.formProcess).subscribe(result => {
      console.log(result);
      if (result['status'] == this.SUCCESS) {
        this.presentToast(result['status'], this.SUCCESS);
      }
      else {
        this.presentToast(result['status'], this.DANGER);
      }
    });
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo que recupera el ID del parametro de viaje y llena el formulario
     */
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.alumnoService.GetAlumno(id).subscribe(resultado => {
      this.alumno =
        resultado[0];
      this.formUpdate.controls['IdAlumno'].setValue(id);
      this.formUpdate.controls['Nombre'].setValue(this.alumno['Nombre']);
      this.formUpdate.controls['Apellidos'].setValue(this.alumno['Apellidos']);
      this.formUpdate.controls['Carnet'].setValue(this.alumno['Carnet']);
    });
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

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     *metodo que ejecuta el alerta para eliminar un registro
     */
  public DeleteAlumno() {
    this.formProcess = this.formUpdate.value;
    this.presentAlertConfirm(this.formProcess['IdAlumno']);

  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param id estable el id del alumnos
     * metodo que establece un alertconfirm para eliminar un registro de alumno
     */
  async presentAlertConfirm($id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar transaccion',
      message: '<strong>No se podra recuperar los datos una vez que se eliminen</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentToast("Operacion Cancelada", "");
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log($id);
            this.alumnoService.DeleteAlumno($id)
              .subscribe(result => {
                console.log(result)
              })
            //redireccionamiento al elemento tab2
            this.presentToast("Alumnos eliminado Correctamente", this.SUCCESS);
            this.router.navigateByUrl("tabs/tab2");
          }
        }
      ]
    });

    await alert.present();
  }

}
