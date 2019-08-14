import { Component } from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import { AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {NavController} from '@ionic/angular';
import {error} from 'util';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
    providers: [AngularFirestore]
  })
export class HomePage {
    uploadProgress: Observable<number>;
    uploadURL: Observable<string>;
    uploadImage: string | ArrayBuffer;
    image: string;
    name: string;
    active: boolean;
    inactive: boolean;
    file: any;
    clientes: {
        Nombre: string;
        Url: string;
        Activo: boolean;
        Inactivo: boolean
    };
    constructor(
                private storage: AngularFireStorage,
                private AFS: AngularFirestore) {
    }
    upload(event) {
        // Get input file
        this.file = event.target.files[0];
        const input = event.target;
        const reader = new FileReader();
        // tslint:disable-next-line:only-arrow-functions
        reader.onload = function() {
            const dataURL = reader.result;
            const output = (document.getElementById('output') as HTMLImageElement);
            if (typeof dataURL === 'string') {
                output.src = dataURL;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
    uploadw() {
            try {
                    const randomId = Math.random().toString(36).substring(2);
                    console.log(randomId);
                    const filepath = `images/${randomId}`;
                    const fileRef = this.storage.ref(filepath);
                    const task = this.storage.upload(filepath, this.file);
                    this.uploadProgress = task.percentageChanges();
                    // Get notified when the download URL is available
                    task.snapshotChanges().pipe(
                        finalize(() => this.uploadURL = fileRef.getDownloadURL())
                    ).subscribe();
                    this.clientes = {
                    Nombre: (document.getElementById('name') as HTMLInputElement).value,
                    Url: filepath,
                    Activo: (document.getElementById('active') as HTMLIonRadioElement).checked,
                    Inactivo: (document.getElementById('inactive') as HTMLIonRadioElement).checked
                };
                    this.AFS.collection('prueba').add(this.clientes).then(res =>
                    alert('funcino!!!'));
            } catch (err) {
                alert('Ingrese nombre e imagen');
        }
    }
      deleteimage() {
        this.uploadImage = null;
      }
}
