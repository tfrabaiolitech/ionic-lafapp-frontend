import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostDTO } from '../../models/lost.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  lost: LostDTO[];
  formGroup: FormGroup;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.lost = this.navParams.get('lost');
      this.formGroup = this.formBuilder.group({
        "@type": ["deliveryPerson", Validators.required]
      });
    }
  
    nextPage() {
     this.lost.delivery = this.formGroup.value;
      this.navCtrl.setRoot('OrderConfirmationPage', {lost: this.lost});
    }
  }
   
