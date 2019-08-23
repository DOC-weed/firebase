import { Injectable } from '@angular/core';
import {finalize} from 'rxjs/operators';
import { AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MetodosService {
    data: '';
    newCliente: {
        name: string,
        url: string,
        act: boolean,
        inact: boolean
    };
    oldCliente: {
        name: string,
        url: string,
        act: boolean,
        inact: boolean
    };

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }
  update(id) {
      this.data = id;
  }
update1(client) {
      this.newCliente.url = client[0];
      this.newCliente.name = client[1];
      this.newCliente.act = client[2];
      this.newCliente.inact = client[3];
}

  update2() {
      this.db.collection('pruebas').doc(this.data).set({
          Nombre: this.newCliente.name,
          URL: this.newCliente.url,
          Activo: this.newCliente.act,
          Inactivo: this.newCliente.inact
      });
  }
}
