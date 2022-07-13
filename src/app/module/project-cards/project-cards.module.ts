import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom modules import
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from "ngx-editor";

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBookComponent } from './create-book/create-book.component';

// Setting up routes for this lazy loaded one
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'createbook', component: CreateBookComponent}
];


@NgModule({
  declarations: [
    DashboardComponent,
    CreateBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxEditorModule
  ],
  exports: [
    NgxEditorModule
  ],
  providers: [

  ]
})
export class ProjectCardsModule { }
