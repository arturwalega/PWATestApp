import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AngularDraggableDirective} from 'angular2-draggable';

@Component({
  selector: 'image-part',
  templateUrl: './image-part.component.html',
  styleUrls: ['./image-part.component.scss']
})
export class ImagePartComponent implements OnInit {
  @Input() x: number;
  @Input() y: number;

  @Input()
  set image(image: HTMLImageElement) {
    setTimeout(() => this.drawImagePart(image), 500);
  }

  @ViewChild('canvanas') canvanas;
  @ViewChild(AngularDraggableDirective) dragable: AngularDraggableDirective;
  @Input() pictureBox;
  private ctx: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit() {
    this.ctx = this.canvanas.nativeElement.getContext('2d');
  }

  drawImagePart(image: HTMLImageElement) {
    if (image) {
      const scale = 1.5;
      console.log(this.pictureBox);
      console.log(image);
      const sx = (this.x - 1) * (image.width / 4);
      const sy = (this.y - 1) * (image.height / 4);
      const sw = image.width / 4;
      const sh = image.height / 4;
      const dx = 0;
      const dy = 0;
      const dw = 300;
      const dh = 150;
      this.ctx.drawImage(image, sx , sy, sw, sh, dx, dy, dw, dh);
      // this.ctx.drawImage(image,(this.x - 1) * (image.width / 4), (this.y - 1) * (image.height / 4), image.width * 4, image.height * 4);

      // const scale = Math.min(50 / image.width, 50 / image.height);
      // // get the top left position of the image
      // const x = (50 / 2) - (image.width / 2) * scale;
      // const y = (50 / 2) - (image.height / 2) * scale;
      // this.ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
  }

  moveEnd($event) {
    console.log(event);
    const rec = this.pictureBox.getBoundingClientRect();
    const left_X = rec.left + ((this.x - 1) * 50);
    const right_X = rec.left + ((this.x) * 50);
    const up_Y = rec.top + ((this.y - 1) * 50);
    const down_Y = rec.top + ((this.y) * 50);

    console.log(event.type);
    if (event.type === 'touchend') {
      const touch = event as TouchEvent;
      if (touch.changedTouches[0].clientX > left_X && touch.changedTouches[0].clientX < right_X) {
        if (touch.changedTouches[0].clientY < down_Y && touch.changedTouches[0].clientY > up_Y) {
          this.canvanas.nativeElement.style.left = left_X + 'px';
          this.canvanas.nativeElement.style.top = up_Y + 'px';
          return;
        }
      }
    }

    if (event.type === 'mouseup') {
      const copy = event as MouseEvent;
      if (copy.x > left_X && copy.x < right_X) {
        if (copy.y < down_Y && copy.y > up_Y) {
          this.canvanas.nativeElement.style.left = left_X + 'px';
          this.canvanas.nativeElement.style.top = up_Y + 'px';
          return;
        }
      }
    }
    this.dragable.resetPosition();
  }
}
