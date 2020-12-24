import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
const data = require('../../assets/data.json');

const DEFAULT_SCROLL_OFFSET = 200;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('inner') inner: ElementRef;
  @ViewChild('focusForwardBtn') focusForwardBtn: ElementRef;
  @ViewChild('focusBackBtn') focusBackBtn: ElementRef;

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  scenes: Scene[] = [];
  selectedScene: Scene;
  innerWidth: number = window.innerWidth;

  ngOnInit(): void {
    // load scenes
    this.scenes = data.scenes;

    // go first scene
    this.goToScene(0);
  }

  goLeft(): void {
    this.inner.nativeElement.scrollLeft -= DEFAULT_SCROLL_OFFSET;
  }

  goRight(): void {
    this.inner.nativeElement.scrollLeft += DEFAULT_SCROLL_OFFSET;
  }

  goToScene(id: number): void {
    this.isLoading$.next(true);
    // find index by id
    const index = this.scenes.findIndex(scene => scene.id === id);
    if (index !== -1) {
      // check that forward to back
      const isBack = !this.selectedScene ? false : (this.selectedScene.id > id);
      // set current scene
      this.selectedScene = this.scenes[index];
      // focus to a point
      setTimeout(() => {
        const offset = isBack ? this.focusBackBtn.nativeElement.offsetLeft : this.focusForwardBtn.nativeElement.offsetLeft;
        this.inner.nativeElement.scrollLeft = offset - (this.innerWidth / 2);
        this.isLoading$.next(false);
      }, 200);
    }
  }
}

export class Scene {
  id: number;
  backgroundUrl: string;
  hitzones: HitZone[];
  focusForwardBtn: any;
  focusBackBtn: any;
}

export class HitZone {
  x: string;
  y: string;
  goto: number;
}
