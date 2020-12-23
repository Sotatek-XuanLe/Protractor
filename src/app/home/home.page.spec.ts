import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit', () => {
    const app = fixture.componentInstance;
    app.data = '{ \
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
        } \
      ] \
    }';
    app.ngOnInit();
    expect(app.scenes.length).toEqual(2);
    expect(app.selectedScene).toEqual(app.scenes[0]);
  });

  it('goLeft', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.inner.nativeElement.scrollLeft = 400;
    app.goLeft();
    expect(app.inner.nativeElement.scrollLeft).toEqual(200);
  });

  it('goRight', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.inner.nativeElement.scrollLeft = 0;
    app.goRight();
    expect(app.inner.nativeElement.scrollLeft).toEqual(200);
  });

  it('goToScene', () => {
    const app = fixture.componentInstance;

    app.data = '{ \
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
        } \
      ] \
    }';
    app.selectedScene = {
      id: 0,
      backgroundUrl: '20201102_152648.jpg',
      hitzones: [
        {
          x: '10%',
          y: '22%',
          goto: 1
        }
      ],
      focusForwardBtn: {
        y: '22%'
      },
      focusBackBtn: {
        y: '72%'
      }
    };
    app.ngOnInit();
    app.goToScene(1);
    expect(app.selectedScene).toEqual(app.scenes[1]);
  });
});
