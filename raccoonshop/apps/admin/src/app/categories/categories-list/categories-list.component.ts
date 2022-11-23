import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@raccoonshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = []
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
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
        });
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

}
