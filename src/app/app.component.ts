import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('picture') image: HTMLImageElement;
  title: string;
  imageSrc: string;
  imageRendered: HTMLImageElement;


  constructor(private swUpdate: SwUpdate) {
    this.title = 'PwaPuzzle';
    this.imageSrc = '';
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe( () => {
        if (confirm('New version is available. Load new version?')) {
          window.location.reload();
        }
      });
    }
  }

  ngAfterViewInit() {
    this.image = document.getElementById('image') as HTMLImageElement;
  }

  myUploader(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      console.log(this.image);

      reader.onload = (() => {
        this.imageSrc = reader.result as string;
        const image = new Image();
        image.src = reader.result as string;
        this.imageRendered = image;
      });
    }
  }
}
