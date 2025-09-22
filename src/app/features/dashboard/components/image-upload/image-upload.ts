import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FoodCard } from '../food-card/food-card';
import { NutritionService } from '../../../../core/services/nutrition.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-upload',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.scss'
})
export class ImageUpload {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Output() imageSelected = new EventEmitter<File>();

  showCamera = false;
  selectedImage: string | null = null;
  selectedFile: File | null = null;
  uploading = false;
  stream: MediaStream | null = null;

  async startCamera() {
    try {
      // Try rear camera first, then front camera, then any camera
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
      } catch (envError) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }
          });
        } catch (userError) {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
        }
      }

      this.showCamera = true;

      setTimeout(() => {
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check camera permissions or try uploading an image instead.');
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.showCamera = false;
  }

  capturePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d')!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        this.selectedFile = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        this.selectedImage = URL.createObjectURL(blob);
        this.stopCamera();
      }
    }, 'image/jpeg', 0.8);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this.uploading = true;
      this.imageSelected.emit(this.selectedFile);
    }
  }

  clearImage() {
    this.selectedImage = null;
    this.selectedFile = null;
    this.uploading = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  resetUpload() {
    this.uploading = false;
  }
}