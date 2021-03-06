import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryListComponent } from './user-story-list.component';

describe('UserStoryListComponent', () => {
  let component: UserStoryListComponent;
  let fixture: ComponentFixture<UserStoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
