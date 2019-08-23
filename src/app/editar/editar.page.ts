import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import { LoadingController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {MetodosService} from '../metodos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  providers: [MetodosService]
})
export class EditarPage implements OnInit {
uploadProgress: Observable<number>;
uploadURL: Observable<string>;
file: any;
clientes: {
    Nombre: string;
    Url: string;
    Activo: boolean;
    Inactivo: boolean;
};
  constructor(private storage: AngularFireStorage,
              private AFS: AngularFirestore,
              private LoadController: LoadingController,
              private ms: MetodosService) { }

  ngOnInit() {
      this.ms.update1(this.clientes);
  }
upload(event) {
     this.file = event.target.files[0];
     const input = event.taget;
     const reader = new FileReader();
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
      this.pepe();
      const randomId = Math.random().toString(36).substring(2);
      console.log(randomId);
      const filepath = `images/${randomId}`;
      const fileRef = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, this.file);
      this.uploadProgress = task.percentageChanges();
      task.snapshotChanges().pipe(
          finalize(() => this.uploadURL = fileRef.getDownloadURL())
      ).subscribe();
      this.clientes = {
        Nombre: (document.getElementById('name') as HTMLIonInputElement).value.toLowerCase(),
        Url: filepath,
        Activo: (document.getElementById('active') as HTMLIonRadioElement).checked,
        Inactivo: (document.getElementById('inactive') as HTMLIonRadioElement).checked
      };
      this.AFS.collection('prueba').add(this.clientes).then(res => alert('Cliente Agregado'));
}
deleteimage() {
    const img = '../../assets/images/user.png';
    const output = document.getElementById('output') as HTMLImageElement;
    output.src = img;
}
async pepe() {
      const loading = await  this.LoadController.create({
          spinner: 'circles',
          duration: 3000,
          message: 'Agregando cliente...',
          translucent: true,
          cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
}
}
