import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  editmode = false;
  currentId = '';
  constructor(
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editmode = true;
        this.categoriesService.getCategory(params['id']).subscribe(category => {
          this.form.controls['name'].setValue(category.name);
          this.form.controls['icon'].setValue(category.icon);
          this.form.controls['color'].setValue(category.color);
          this.currentId = category.id;
        })
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return
    }
    const category: Category = {
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
    }
  }

  goBack() {
    this.router.navigate(['/', 'categories']);
  }


}
