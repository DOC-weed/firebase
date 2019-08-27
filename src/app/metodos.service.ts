import { Injectable } from '@angular/core';
import {finalize} from 'rxjs/operators';
import { AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MetodosService {
    datas: '';
    wea: any[];
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
      const datas = id;
      return datas;
  }
  showx2(id) {
      const sh = this.db.collection('prueba').doc(id);
      /* sh.update({
          Nombre: '',
          Url: '' ,
          Activo: true,
          Inactivo: false
      });

       */
      sh.get().toPromise().then( function(doc) {
          console.log(doc.data());
      });

      console.log(sh);
  }

/* update1(client) {
      this.newCliente.url = client[0];
      this.newCliente.name = client[1];
      this.newCliente.act = client[2];
      this.newCliente.inact = client[3];
      return client;
}

 */
/*datosclinetes() {
      this.oldCliente.url = this.newCliente.url;
      this.oldCliente.name = this.newCliente.name;
      this.oldCliente.act = this.newCliente.act;
      this.oldCliente.inact = this.newCliente.inact;
      return this.oldCliente;
}

 */

  update2() {
      this.db.collection('pruebas').doc(this.datas).set({
          Nombre: this.newCliente.name,
          URL: this.newCliente.url,
          Activo: this.newCliente.act,
          Inactivo: this.newCliente.inact
      });
  }
   saveimg(src) {
      const img = src;
      this.datas = img;
      console.log(img);
      console.log(this.datas);
      return img;
  }
}
