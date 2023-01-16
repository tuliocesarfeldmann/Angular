import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.productService.readById(id).subscribe({
        next: (p: Product) => this.product = p
      })
    }
  }
  
  createOrUpdateProduct(): void {
    if(this.product.id){
      this.productService.update(this.product).subscribe({
        next: (p: Product) => {
          this.productService.showMessage(`Produto ${p.name} atualizado com sucesso!`)
          this.router.navigate(['/products'])
        }
      })
    } else {
      this.productService.create(this.product).subscribe({
        next: () => {
          this.productService.showMessage('Produto criado com sucesso!')
          this.router.navigate(['/products'])
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
