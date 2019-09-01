import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { StorageService } from '../../services/storage.service';
import { ProductDTO } from '../../models/product.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProductService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart(); //Carrega os itens do carrinho na em let cart
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }
  removeItem(produto: ProductDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProductDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  // total() : number {
  //   return this.cartService.total();
  // }  


  goOn() {
    //this.storage.deleteCart();
    this.navCtrl.setRoot('CategoriasPage');
  }
  checkout() {
    this.navCtrl.push('PickAddressPage');
  }

}