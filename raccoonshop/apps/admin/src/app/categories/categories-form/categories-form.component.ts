import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.controls['name'].value)
    console.log(this.form.controls['icon'].value)
  }
}
