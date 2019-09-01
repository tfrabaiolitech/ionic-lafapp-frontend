import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import {CredenciaisDTO} from '../../models/credenciais.dto'
import { AuthService } from '../../services/auth.service';
@IonicPage() //Este decorator que diz a aplicação 
//que está classe é uma página permitindo referenciar a está classe na forma de string.
//Decorator
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' //Referência para o arquivo HTML que está controlando.
})

export class HomePage {

  creds: CredenciaisDTO = {
    email : "",
    senha : ""
  }
  constructor(public navCtrl: NavController, public menu: MenuController,
    public auth : AuthService) {


  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
     this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    erros => {});
  }

  login(){
   this.auth.authenticate(this.creds)
   .subscribe(response => {
    this.auth.successfulLogin(response.headers.get('Authorization'));
     this.navCtrl.setRoot('CategoriasPage');
   },
   erros => {});
   
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
