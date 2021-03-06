import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PruebaPage } from './prueba.page';
import {PipesModule} from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PruebaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PruebaPage]
})
export class PruebaPageModule {}
