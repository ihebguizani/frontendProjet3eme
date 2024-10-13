import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceSearchComponent } from './annonce-search.component';

describe('AnnonceSearchComponent', () => {
  let component: AnnonceSearchComponent;
  let fixture: ComponentFixture<AnnonceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnonceSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnonceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
