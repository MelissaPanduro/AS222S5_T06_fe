import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotFormComponent } from './chatbot-form.component';

describe('ChatbotFormComponent', () => {
  let component: ChatbotFormComponent;
  let fixture: ComponentFixture<ChatbotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
