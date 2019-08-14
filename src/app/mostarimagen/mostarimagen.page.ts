import { Component, OnInit } from '@angular/core';
import {MetodosService} from '../metodos.service';
import {Route} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';




@Component({
  selector: 'app-mostarimagen',
  templateUrl: './mostarimagen.page.html',
  styleUrls: ['./mostarimagen.page.scss'],
})
@Injectable()
export class MostarimagenPage {
  constructor(private Ms: MetodosService,
              private storage1: AngularFireStorage,
              private database: AngularFirestore) {}






}

