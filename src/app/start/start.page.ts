import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  showSkip;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * @param evento evento que activa la opcion
     * metodo que reconoce el evento para habilitar un boton en la vista
     */
  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  /**
     * @autor Juan Carlos Ruiz Nativi
     * @Carnet RN100216
     * metodo direcciona al menu tabs
     */
  startAppNavController() {
    //este permite la navegacion con navCtrl
    this.router.navigateByUrl('tabs');
  }

}
