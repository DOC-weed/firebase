import { Component, OnInit } from '@angular/core';
import {AngularFireStorageReference} from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {forEach} from '@angular-devkit/schematics';
import {MetodosService} from '../metodos.service';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
    providers: [MetodosService]
})
export class PruebaPage implements OnInit {
    // Variables utilizadas o por utilizar
sh: any[];
searchText = '';
data: any[];
id: any;
lawealoca : '';
  constructor( public bd: AngularFirestore, private storage: AngularFireStorage,
               private ms: MetodosService) { }
  ngOnInit() {
    this.show();
  }
  // mostar todos los datos del arreglo de clientes
show() {
  const def = this.bd.collection('prueba').snapshotChanges().subscribe(data => {
    this.sh = data.map(e => {
      return {
        id: e.payload.doc.id,
        clientes: e.payload.doc.data()
      };
    });
    console.log(this.sh);
    // mostrar imagenes
    for (const clientes of this.sh) {
        console.log(clientes.clientes.Url);
        this.storage.ref('').child(clientes.clientes.Url).getDownloadURL().toPromise().then((url) => {
            console.log(url);
            console.log(clientes.id);
            clientes.clientes.Url2 = url;
        }).catch((error) => {
            console.log('kha!');
            console.log(error);
            });
    }
  });
      }
      // filtrar resultado de la barra de busqueda
      search( event) {
      this.searchText = event.detail.value;
      }
      // obtener datos para update
      sendData() {
      const id = (document.getElementById('id') as HTMLIonLabelElement).textContent;
      const client = [];
      client[0] = (document.getElementById('img') as HTMLImageElement).src;
      client[1] = (document.getElementById('name')as HTMLIonLabelElement).textContent;
      client[2] = (document.getElementById('active')as HTMLIonRadioElement).checked;
      client[3] = (document.getElementById('inactive')as HTMLIonRadioElement).checked;
      this.ms.update(id);

      console.log(id);
      console.log(client);

      }
}


