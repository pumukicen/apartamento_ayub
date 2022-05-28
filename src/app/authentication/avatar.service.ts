import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

import { AuthService } from './auth.service';

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private basePath = '/images';
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const extension = fileUpload.file.type.split('/')[1];
    const userId = this.authService.fireBaseUser?.uid as string;
    const fileName = `avatar_${userId}.${extension}`;
    const filePath = `${this.basePath}/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
            this.authService.updateAvatar(fileUpload.url);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
}
