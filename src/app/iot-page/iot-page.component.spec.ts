import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotPageComponent } from './iot-page.component';

describe('IotPageComponent', () => {
  let component: IotPageComponent;
  let fixture: ComponentFixture<IotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
