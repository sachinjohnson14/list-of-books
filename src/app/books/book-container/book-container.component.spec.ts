import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BooksService } from "../books.service";

import { BookContainerComponent } from "./book-container.component";

describe("BookContainerComponent", () => {
  let component: BookContainerComponent;
  let fixture: ComponentFixture<BookContainerComponent>;
  let rService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookContainerComponent],
      imports: [
        BrowserDynamicTestingModule,
        MatCardModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: "books", component: BookContainerComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookContainerComponent);
    component = fixture.componentInstance;
    rService = fixture.debugElement.injector.get(BooksService);
    rService.rowData.next([
      {
        title: "--",
        pageCount: "--",
        language: "--",
        description: "--",
        infoLink: "--",
        subtitle: "--",
        publishedDate: "--",
      },
    ]);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should execute else part of create", () => {
    rService.rowData.next(null);
    expect(component.ngOnInit).toBeTruthy();
  });
});
