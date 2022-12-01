import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {

  products = []
  constructor(
    //private productsService: ,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  deleteProduct(productId: string) {
/*    this.confirmationService.confirm({
            message: 'Are you sure that you want to delete the category?',
            header: 'Delete Category',
            icon: 'pi pi-exclaimation-triangle',
            accept: () => {
              this.categoriesService.deleteCategory(categoryId).subscribe({
                next: res => {
                  this.messageService.add({
                    severity:'success', 
                    summary:'Success', 
                    detail:'Category is deleted'});
                  this.getCategories();
                },
                error: err => {
                  this.messageService.add({
                    severity:'error', 
                    summary:'Error', 
                    detail:'Error deleting category'});
                }
              })
            }
        });*/
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private getProducts() {
    /*this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
    })*/
  }

}
