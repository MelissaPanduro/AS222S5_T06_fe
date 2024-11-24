import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatQueriesComponent } from './chat-queries.component';

describe('ChatQueriesComponent', () => {
  let component: ChatQueriesComponent;
  let fixture: ComponentFixture<ChatQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
