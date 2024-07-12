import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickFoodsComponent } from './pick-foods.component';

describe('PickFoodsComponent', () => {
  let component: PickFoodsComponent;
  let fixture: ComponentFixture<PickFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickFoodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
