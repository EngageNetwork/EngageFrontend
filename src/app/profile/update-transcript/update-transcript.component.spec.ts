import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTranscriptComponent } from './update-transcript.component';

describe('UpdateTranscriptComponent', () => {
  let component: UpdateTranscriptComponent;
  let fixture: ComponentFixture<UpdateTranscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTranscriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
