import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscSearchComponent } from './disc-search.component';

describe('DiscSearchComponent', () => {
  let component: DiscSearchComponent;
  let fixture: ComponentFixture<DiscSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
