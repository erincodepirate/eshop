import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories = [
    {id: 1, name: "foo", icon: "some icon"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
