import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MostarimagenPage } from './mostarimagen.page';
import {HomePageModule} from "../home/home.module";

const routes: Routes = [
  {
    path: '',
    component: MostarimagenPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HomePageModule
    ],
  declarations: [MostarimagenPage]
})
export class MostarimagenPageModule {}
