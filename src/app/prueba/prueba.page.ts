import { Component, OnInit } from '@angular/core';
import {AngularFireStorageReference} from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';


import {AlertController, LoadingController, PopoverController} from '@ionic/angular';
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


    constructor(public bd: AngularFirestore,
                private storage: AngularFireStorage,
                private popover: PopoverController,
                private alertctrl: AlertController,
                private LoadCtrl: LoadingController) {
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

    // Disparar Popover
    async sendData(id) {
        localStorage.setItem('id', id);
        const popov = await this.popover.create({
            component: EditarPage,
            cssClass: 'custom-css'
        });
        return await popov.present();

    }
    // Guardar datos de clientes en el Storage
    saveimage(cliente) {
        localStorage.setItem('nombre', cliente.Nombre);
        localStorage.setItem('activo', cliente.Activo);
        localStorage.setItem('inactivo', cliente.Inactivo);
        localStorage.setItem('img', cliente.Url2);
        localStorage.setItem('refSt', cliente.Url);
    }
    // Eliminar clientes
     async delete(id) {
        const alert = await this.alertctrl.create({
            message: '¿Esta seguro de eliminar el cliente?',
            buttons: [
                {text: 'Cancelar',
                role: 'Cancel',
                handler: blah => {
                    console.log('confirm cancel: blah');
                }},
                {text: 'Confirmar',
                handler: () => {
                    this.bd.collection('prueba').doc(id).delete();
                    const ref = localStorage.getItem('refSt');
                    this.storage.ref(ref).delete();
                }}
            ],
        });
        return alert.present();
    }





}


