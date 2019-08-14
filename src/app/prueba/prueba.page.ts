import { Component, OnInit } from '@angular/core';
import {AngularFireStorageReference} from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
sh: any;

  constructor( public bd: AngularFirestore, private storage: AngularFireStorage) { }
  ngOnInit() {
    this.show();
    const dataURL = this.storage.ref(``).child(`images/b7ycp5q8o49.jpg`).getDownloadURL().subscribe();
    const url = (document.getElementById('op') as HTMLImageElement);
    if (typeof dataURL === 'string') {
      url.src = dataURL;
    }
    console.log(dataURL);
  }
show() {
  const def = this.bd.collection('prueba').snapshotChanges().subscribe(data => {
    this.sh = data.map(e => {
      return {
        id: e.payload.doc.id,
        clientes: e.payload.doc.data()
      };
    });

    console.log(this.sh);
  });
}
}


