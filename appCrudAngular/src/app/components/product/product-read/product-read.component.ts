import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

  constructor(
    private productService: ProductService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.productService.read().subscribe({
      next: (products) => {
        this.products = products
      }
    })
  }

  deleteProduct(product: Product) {
    if (window.confirm(`Realmente deseja excluir o produto ${product.name}?`)) {
      this.productService.delete(product.id!.toString()).subscribe({
        next: () => {
          this.productService.showMessage(`Produto ${product.name} removido com sucesso!`)
          this.ngOnInit();
        }
      })
    }
  }

}
