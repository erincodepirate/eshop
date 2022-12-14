import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@raccoonshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {

  products: Product[] = []
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
            message: 'Are you sure that you want to delete the category?',
            header: 'Delete Product',
            icon: 'pi pi-exclaimation-triangle',
            accept: () => {
              this.productsService.deleteProduct(productId).subscribe({
                next: res => {
                  this.messageService.add({
                    severity:'success', 
                    summary:'Success', 
                    detail:'Product is deleted'});
                  this.getProducts();
                },
                error: err => {
                  this.messageService.add({
                    severity:'error', 
                    summary:'Error', 
                    detail:'Error deleting category'});
                }
              })
            }
        });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private getProducts() {
    this.productsService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

}
