import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import {LoadingController, PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss']
})

export class EditarPage implements OnInit {
    uploadProgress: Observable<number>;
    uploadURL: Observable<string>;
    file: any;
    data: string;
    nombre: string;
    activoo: boolean;
    inactivoo: boolean;
    popo: string;

    constructor(private storage: AngularFireStorage,
                private AFS: AngularFirestore,
                private LoadController: LoadingController,
                private popover: PopoverController) {
    }

    ngOnInit() {
     this.showx2();
    }
// Guardar la url de la imagen en la variable y mostarla
    upload(event) {
        this.file = event.target.files[0];
        console.log(this.file);
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
        const url = (document.getElementById('output') as HTMLImageElement).src;
        console.log(url);
        console.log(this.popo);
        if (url === this.popo) {
                this.AFS.collection('prueba').doc(this.data).update({
                    Nombre: this.nombre,
                    Activo: (document.getElementById('active') as HTMLIonRadioElement).checked,
                    Inactivo: (document.getElementById('inactive') as HTMLIonRadioElement).checked
                }).then(res => alert('Cliente Actualizado'));
                this.pepe();
                this.dismiss();
            } else {
                const randomId = Math.random().toString(36).substring(2, 9);
                console.log(randomId);
                const filepath = `images/${randomId}`;
                const fileRef = this.storage.ref(filepath);
                const task = this.storage.upload(filepath, this.file);
                this.uploadProgress = task.percentageChanges();
                task.snapshotChanges().pipe(
                    finalize(() => this.uploadURL = fileRef.getDownloadURL())
                ).subscribe();
                this.AFS.collection('prueba').doc(this.data).update({
                    Nombre: this.nombre.toLowerCase(),
                    Url: filepath,
                    Activo:  this.activoo/*(document.getElementById('active') as HTMLIonRadioElement).checked*/,
                    Inactivo: this.inactivoo /*(document.getElementById('inactive') as HTMLIonRadioElement).checked*/
                });
                const ref = localStorage.getItem('refSt');
                this.storage.ref(ref).delete();
                this.pepe();
                this.dismiss();
            }

         } catch {
            alert('Datos incompletos, por favor ingrese datos');
        }
    }

    deleteimage() {
        const img = '../../assets/images/user.png';
        const output = document.getElementById('output') as HTMLImageElement;
        output.src = img;
        this.file = null;
    }

    async pepe() {
        const loading = await this.LoadController.create({
            spinner: 'circles',
            duration: 3000,
            message: 'Actualizando datos...'
        });
        return await loading.present();
    }
// recuperar datos de los clientes del Storage
    showx2() {
        this.popo = localStorage.getItem('img');
        this.nombre = localStorage.getItem('nombre');
        this.data = localStorage.getItem('id');
    }
// Cerrar popover
    dismiss() {
        this.popover.dismiss();
    }
    getvalue(checked) {
        this.activoo = checked;
    }
    getvalue2(cheked) {
        this.inactivoo = cheked;
    }
}
