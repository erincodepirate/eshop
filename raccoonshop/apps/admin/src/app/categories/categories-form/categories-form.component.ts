import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@raccoonshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return
    }
    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value
    }
    this.categoriesService.createCategory(category).subscribe({
      next: res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category is Created'});
      },
      error: err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error creating category'});
      },
      complete: () => {
        setTimeout(()=> {
          this.router.navigate(['/', 'categories']);
        }, 2000)
      }
    });
  }
}
