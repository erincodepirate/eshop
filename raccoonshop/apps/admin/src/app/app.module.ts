import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@raccoonshop/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

const UX_MODULE = [InputTextModule, CardModule, ToolbarModule, ButtonModule, TableModule];

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    [...UX_MODULE],
  ],
  providers: [CategoriesService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
