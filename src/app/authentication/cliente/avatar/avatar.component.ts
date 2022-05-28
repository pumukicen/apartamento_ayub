import { Component, ElementRef, ViewChild } from '@angular/core';

import { AvatarService, FileUpload } from '../../avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @ViewChild('openfile') button: ElementRef;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  opened: boolean;
  constructor(private uploadService: AvatarService) {}
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles?.length) this.upload();
    else this.opened = false;
  }
  private upload(): void {
    this.opened = true;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if (this.percentage === 100) {
              setTimeout(() => (this.opened = false), 600);
            }
          },
          () => setTimeout(() => (this.opened = false), 600)
        );
      }
    }
  }
  openFile(): void {
    this.percentage = 0;
    this.button.nativeElement.click();
  }
}
