import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PioneerComponent } from './pioneer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';

describe('PioneerComponent', () => {
  let component: PioneerComponent;
  let fixture: ComponentFixture<PioneerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PioneerComponent ],
      imports: [ HttpClientTestingModule, MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
