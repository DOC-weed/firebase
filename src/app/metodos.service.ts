import { Injectable } from '@angular/core';
import {finalize} from 'rxjs/operators';
import { AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodosService {
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  image: string;
  file: any;
  constructor(private storage: AngularFireStorage) { }
  /*saveimages() {
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    console.log(this.uploadURL);
    const filepath = 'images/${randomId}';
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, this.file );
    this.uploadProgress = task.percentageChanges();
    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
    console.log(this.uploadURL);
  }
  deleteimage() {
    this.file = '';
    this.image = null;
  }
  showImages() {
    console.log(this.uploadURL);
  }*/

}
