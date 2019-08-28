import { Component, OnInit } from '@angular/core';
import {AngularFireStorageReference} from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {forEach} from '@angular-devkit/schematics';

import {PopoverController} from '@ionic/angular';
import {EditarPage} from '../editar/editar.page';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss']
})
export class PruebaPage implements OnInit {
    // Variables utilizadas o por utilizar
    sh: any[];
    searchText = '';
    data: any[];
    id: any;
    lawealoca: '';


    constructor(public bd: AngularFirestore, private storage: AngularFireStorage,
                private popover: PopoverController) {
    }

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
    search(event) {
        this.searchText = event.detail.value;
    }

    //
    async sendData(id) {
        localStorage.setItem('id', id);
        const popov = await this.popover.create({
            component: EditarPage,
            cssClass: 'custom-css'
        });
        return await popov.present();

        /* const client = [];
        client[0] = (document.getElementById('img') as HTMLImageElement).src;
        client[1] = (document.getElementById('name')as HTMLIonLabelElement).textContent;
        client[2] = (document.getElementById('active')as HTMLIonRadioElement).checked;
        client[3] = (document.getElementById('inactive')as HTMLIonRadioElement).checked;

         */
        // this.ms.update(id);
        // this.ms.update1(client);
        // console.log(id);
        // console.log(client);

    }
    saveimage(cliente) {
        // localStorage.setItem('pp', element.id);
        localStorage.setItem('nombre', cliente.Nombre);
        localStorage.setItem('activo', cliente.Activo);
        localStorage.setItem('inactivo', cliente.Inactivo);
        localStorage.setItem('img', cliente.Url2);
    }
    /* senddatos(id) {
        this.ms.showx2(id);
        console.log(id);
         const sh = this.bd.collection('prueba').doc(id);
        // tslint:disable-next-line:only-arrow-functions
        sh.get().toPromise().then(function(doc) {
            if (doc.exists) {
                console.log('Document data:', doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }


        });



    }

     */

}


