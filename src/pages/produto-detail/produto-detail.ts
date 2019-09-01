import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProductService } from '../../services/domain/product.service';
import { CartService } from '../../services/domain/cart.service';



@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProductDTO;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService) {
  }

  

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.productService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.productService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});

  }

  addToCart(produto: ProductDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
