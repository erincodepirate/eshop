import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService, Category, ProductsService } from '@raccoonshop/products';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentId = '';
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private productsService: ProductsService,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: ['']
    })
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editmode = true;
        /*this.productsService.getProduct(params['id']).subscribe(category => {
          this.form.controls['name'].setValue(category.name);
          this.form.controls['icon'].setValue(category.icon);
          this.form.controls['color'].setValue(category.color);
          this.currentId = category.id;
        })*/
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return
    }
    /*const category: Category = {
      id: this.currentId,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    }
    if (this.editmode) {
      this.categoriesService.updateCategory(category).subscribe({
        next: res => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Category is Updated'});
          setTimeout(()=> {
            this.goBack();
          }, 2000)
        },
        error: err => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error updated category'});
        }
      })
    } else {
      this.categoriesService.createCategory(category).subscribe({
        next: res => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Category is Created'});
          setTimeout(()=> {
            this.goBack();
          }, 2000)
        },
        error: err => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error creating category'});
        }
      });
    }*/
  }

  goBack() {
    this.router.navigate(['/', 'products']);
  }

}
