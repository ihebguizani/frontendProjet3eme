import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  currentIndex: number;

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { photos: string[], selectedIndex: number }
  ) {
    this.currentIndex = data.selectedIndex;
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.data.photos.length;
  }

  previousImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.data.photos.length) % this.data.photos.length;
  }

  close(): void {
    this.dialogRef.close();
  }
}
