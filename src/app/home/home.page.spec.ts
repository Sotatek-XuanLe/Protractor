import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const data = require('../../assets/data.json');
const DEFAULT_SCROLL_OFFSET = 200;

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

    app.ngOnInit();
    expect(app.scenes.length).toEqual(data.scenes.length);
    expect(app.selectedScene).toEqual(app.scenes[0]);
  });

  it('goLeft', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.inner.nativeElement.scrollLeft = 400;
    app.goLeft();
    expect(app.inner.nativeElement.scrollLeft).toEqual(400 - DEFAULT_SCROLL_OFFSET);
  });

  it('goRight', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.inner.nativeElement.scrollLeft = 0;
    app.goRight();
    expect(app.inner.nativeElement.scrollLeft).toEqual(DEFAULT_SCROLL_OFFSET);
  });

  it('goToScene', fakeAsync(() => {
    const app = fixture.componentInstance;
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

    tick(201);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.inner.nativeElement.scrollLeft).toEqual(762);
    });

    app.goToScene(-1);
    expect(app.selectedScene).toEqual(app.scenes[1]);
  }));
});
