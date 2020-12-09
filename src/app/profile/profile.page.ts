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

  private createForm() {
    return this.formBuilder.group({
      IdAlumno: ["", Validators.required],
      Nombre: ["", Validators.required],
      Apellidos: ["", Validators.required],
      Carnet: ["", Validators.required]
    });
  }

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

  public DeleteAlumno() {
    this.formProcess = this.formUpdate.value;
    this.presentAlertConfirm(this.formProcess['IdAlumno']);

  }

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
