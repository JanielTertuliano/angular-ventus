import { WindowService } from './../window.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dock',
  templateUrl: 'dock.component.html',
  styleUrls: ['dock.component.css']
})
export class DockComponent implements OnInit {
  @ViewChild('dockdiv') private dock: ElementRef;
  private arrayImg: HTMLCollection;
  @Input() public winlist: any[];
  @Input() public iconWidth = 30;
  private minimalScale = 0.5;
  private minimalDistance = 300;

  // position de depart d'apparition des fenetres
  private x_pos = 20;
  private y_pos = 20;

  constructor(private _wm: WindowService) {

  }

  ngOnInit() {
    this.arrayImg = this.dock.nativeElement.children;

    document.onmousemove = (ev) => {
      this.onMovement(ev);
    };
  }

  private onMovement(ev) {
    const oEvent: MouseEvent = <MouseEvent>ev || <MouseEvent>event;
    for (let i = 0; i < this.arrayImg.length; i++) {
      const elem: HTMLElement = <HTMLElement>this.arrayImg[i];
      // calculates the horizontal and vertival distance from cursor to the center of each image
      const a = elem.offsetLeft + elem.offsetWidth / 2 - oEvent.clientX;
      const b = elem.offsetTop + this.dock.nativeElement.offsetTop + elem.offsetHeight / 2 - oEvent.clientY;
      // calculates the staight distance from cursor to the center of each image
      const c = Math.sqrt(a * a + b * b);
      // as the distance becomes smaller, the scale should be larger, 500 is a factor that can be customized to adjust
      // the distance where the dock can sense the cursor moves towards it
      let scale = 1 - c / this.minimalDistance;
      // always set the 1/2 scale no matter how far the cursor is away from the dock
      if (scale < this.minimalScale) {
        scale = this.minimalScale;
      }
      elem.style.width = this.iconWidth * scale + 'px';
    }
  }

  private dockSelect(id) {
    if($(`#${id}`).hasClass('active') || $(`#${id}`).hasClass('minimized')  ){
      $(`#${id}`)[0].querySelector('.wm-minimize').click();
    }
    $(`#${id}`)[0].querySelector('.wm-window-title').click();
  }
}
