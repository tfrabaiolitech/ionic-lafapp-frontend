import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostDTO } from '../../models/lost.dto';
import { CartItem } from '../../models/cart-item';
import { AddressDTO } from '../../models/address.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { LostService } from '../../services/domain/lost.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  lost: LostDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  address: AddressDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public lostService: LostService) {

    this.lost = this.navParams.get('lost');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.lost.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.address = this.findEndereco(this.lost.enderecoAddress.id, response['address']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findEndereco(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  checkout() {
    this.lostService.insert(this.lost)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  
}