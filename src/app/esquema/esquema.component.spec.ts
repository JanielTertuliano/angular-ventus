import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemaComponent } from './esquema.component';

describe('EsquemaComponent', () => {
  let component: EsquemaComponent;
  let fixture: ComponentFixture<EsquemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsquemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsquemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
