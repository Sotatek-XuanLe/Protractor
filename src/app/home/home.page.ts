import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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
  data = '{ \
      "scenes": [ \
        { \
          "id": 0, \
          "backgroundUrl": "20201102_152648.jpg", \
          "hitzones": [ \
            { \
              "x": "10%", \
              "y": "22%", \
              "goto": 1 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "22%" \
          }, \
          "focusBackBtn": { \
            "y": "72%" \
          } \
        }, \
        { \
          "id": 1, \
          "backgroundUrl": "20201102_152507.jpg", \
          "hitzones": [ \
            { \
              "x": "10%", \
              "y": "25%", \
              "goto": 2 \
            }, \
            { \
              "x": "72%", \
              "y": "62%", \
              "goto": 0 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "25%" \
          }, \
          "focusBackBtn": { \
            "y": "62%" \
          } \
        }, \
        { \
          "id": 2, \
          "backgroundUrl": "20201102_152112.jpg", \
          "hitzones": [ \
            { \
              "x": "10%", \
              "y": "8%", \
              "goto": 3 \
            }, \
            { \
              "x": "51%", \
              "y": "74%", \
              "goto": 1 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "8%" \
          }, \
          "focusBackBtn": { \
            "y": "74%" \
          } \
        }, \
        { \
          "id": 3, \
          "backgroundUrl": "20201102_151819.jpg", \
          "hitzones": [ \
            { \
              "x": "10%", \
              "y": "26%", \
              "goto": 4 \
            }, \
            { \
              "x": "26%", \
              "y": "70%", \
              "goto": 2 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "26%" \
          }, \
          "focusBackBtn": { \
            "y": "70%" \
          } \
        }, \
        { \
          "id": 4, \
          "backgroundUrl": "20201102_151448.jpg", \
          "hitzones": [ \
            { \
              "x": "7%", \
              "y": "17.5%", \
              "goto": 5 \
            }, \
            { \
              "x": "36%", \
              "y": "71%", \
              "goto": 3 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "17.5%" \
          }, \
          "focusBackBtn": { \
            "y": "71%" \
          } \
        }, \
        { \
          "id": 5, \
          "backgroundUrl": "20201102_151217.jpg", \
          "hitzones": [ \
            { \
              "x": "46%", \
              "y": "13%", \
              "goto": 4 \
            }, \
            { \
              "x": "55%", \
              "y": "48.5%", \
              "goto": 6 \
            }, \
            { \
              "x": "36%", \
              "y": "81%", \
              "goto": 7 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "81%" \
          }, \
          "focusBackBtn": { \
            "y": "13%" \
          } \
        }, \
        { \
          "id": 6, \
          "backgroundUrl": "20201102_150944.jpg", \
          "hitzones": [ \
            { \
              "x": "35%", \
              "y": "17%", \
              "goto": 5 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "65%" \
          }, \
          "focusBackBtn": { \
            "y": "17%" \
          } \
        }, \
        { \
          "id": 7, \
          "backgroundUrl": "20201102_150435.jpg", \
          "hitzones": [ \
            { \
              "x": "60%", \
              "y": "27%", \
              "goto": 5 \
            }, \
            { \
              "x": "42%", \
              "y": "63%", \
              "goto": 8 \
            }, \
            { \
              "x": "40%", \
              "y": "80%", \
              "goto": 9 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "80%" \
          }, \
          "focusBackBtn": { \
            "y": "27%" \
          } \
        }, \
        { \
          "id": 8, \
          "backgroundUrl": "20201102_150217.jpg", \
          "hitzones": [ \
            { \
              "x": "44%", \
              "y": "12%", \
              "goto": 9 \
            }, \
            { \
              "x": "55%", \
              "y": "42%", \
              "goto": 7 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "12%" \
          }, \
          "focusBackBtn": { \
            "y": "42%" \
          } \
        }, \
        { \
          "id": 9, \
          "backgroundUrl": "20201102_145719.jpg", \
          "hitzones": [ \
            { \
              "x": "42%", \
              "y": "32%", \
              "goto": 7 \
            }, \
            { \
              "x": "48%", \
              "y": "49%", \
              "goto": 8 \
            } \
          ], \
          "focusForwardBtn": { \
            "y": "90%" \
          }, \
          "focusBackBtn": { \
            "y": "32%" \
          } \
        } \
      ] \
    }';

  ngOnInit(): void {
    // load scenes
    this.scenes = JSON.parse(this.data).scenes;

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
