import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonManagerComponent as JsonManager } from './json-manager';

describe('JsonManager', () => {
  let component: JsonManager;
  let fixture: ComponentFixture<JsonManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonManager]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JsonManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
