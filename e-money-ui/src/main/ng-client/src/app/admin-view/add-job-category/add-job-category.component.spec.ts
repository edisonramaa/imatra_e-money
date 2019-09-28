import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddJobCategoryComponent} from './add-job-category.component';

describe('AddJobCategoryComponent', () => {
  let component: AddJobCategoryComponent;
  let fixture: ComponentFixture<AddJobCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
