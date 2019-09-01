import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';
@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProductDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public productService: ProductService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.productService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => {});
    }

    loadImageUrls() {
      for (var i=0; i<this.items.length; i++) {
        let item = this.items[i];
        this.productService.getSmallImageFromBucket(item.id)
          .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
          error => {});
      }
    }  

    showDetail(produto_id : string) {
      this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
    }

    
}