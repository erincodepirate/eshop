import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService, Category, Product, ProductsService } from '@raccoonshop/products';
import { Location } from '@angular/common';


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
  imageDisplay: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private productsService: ProductsService,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private location: Location,
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
      image: ['', Validators.required],
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
        this.productsService.getProduct(params['id']).subscribe(product => {
          this.form.controls['name'].setValue(product.name);
          this.form.controls['brand'].setValue(product.brand);
          this.form.controls['price'].setValue(product.price);
          this.form.controls['category'].setValue(product.category?.id);
          this.form.controls['countInStock'].setValue(product.countInStock);
          this.form.controls['description'].setValue(product.description);
          this.form.controls['richDescription'].setValue(product.richDescription);
          this.form.controls['isFeatured'].setValue(product.isFeatured);
          this.currentId = product.id;
          this.imageDisplay = product.image;
          this.form.controls['image'].setValidators([]);
        })
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return
    }
    const productFormData = new FormData();
    Object.keys(this.form.controls).map((key)=> {
      productFormData.append(key, this.form.controls[key].value);
    });
    if (this.editmode) {
      this.productsService.updateProduct(this.currentId, productFormData).subscribe({
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
      this.productsService.createProduct(productFormData).subscribe({
        next: res => {
          this.messageService.add({severity:'success', summary:'Success', detail:`Product ${res.name} is Created`});
          setTimeout(()=> {
            this.goBack();
          }, 2000)
        },
        error: err => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error creating category'});
        }
      });
    }
  }

  onImageUpload(event: any) {
    if (event.target) {
      const file = event.target.files[0];
      if (file) {
        this.form.patchValue({ image: file });
        this.form.controls['image'].updateValueAndValidity();
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageDisplay = <string>fileReader.result;
        };
        fileReader.readAsDataURL(file);
      }
    }
  }

  goBack() {
    this.router.navigate(['/', 'products']);
  }

}
