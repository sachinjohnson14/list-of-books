import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
} from "@angular/material";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxSpinnerModule } from "ngx-spinner";
import { of, throwError } from "rxjs";
import { BooksService } from "../books.service";

import {
  BookListComponent,
  DialogOverviewExampleDialog,
} from "./book-list.component";

describe("BookListComponent", () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let rService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent, DialogOverviewExampleDialog],
      imports: [
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        HttpClientModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatSnackBarModule,
        NgxSpinnerModule,
        RouterTestingModule.withRoutes([
          { path: "books/details", component: BookListComponent },
        ]),
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [DialogOverviewExampleDialog] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    rService = fixture.debugElement.injector.get(BooksService);
    component.redditList = [
      {
        title: "--",
        pageCount: "--",
        language: "--",
        description: "--",
        infoLink: "--",
        subtitle: "--",
        publishedDate: "--",
      },
    ];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should execute fetchRedditList", () => {
    let object = {
      kind: "books#volumes",
      totalItems: 2024,
      items: [
        {
          volumeInfo: {
            title: "Kashmir - the Bermuda Triangle of India",
            subtitle: "Kalashnikov Kahwa and Kaffir",
            authors: ["Sharad Mohan"],
            publishedDate: "2020-02-21",
            description:
              "This book tries to give you a glance at Kashmir's rich culture",
            industryIdentifiers: [
              {
                type: "ISBN_13",
                identifier: "9798617401549",
              },
            ],
            readingModes: {
              text: false,
              image: false,
            },
            pageCount: 542,
            printType: "BOOK",
            maturityRating: "NOT_MATURE",
            allowAnonLogging: false,
            contentVersion: "preview-1.0.0",
            panelizationSummary: {
              containsEpubBubbles: false,
              containsImageBubbles: false,
            },
            language: "en",
            previewLink:
              "http://books.google.co.in/books?id=2SuAzQEACAAJ&dq=isbn&hl=&cd=1&source=gbs_api",
            infoLink:
              "http://books.google.co.in/books?id=2SuAzQEACAAJ&dq=isbn&hl=&source=gbs_api",
            canonicalVolumeLink:
              "https://books.google.com/books/about/Kashmir_the_Bermuda_Triangle_of_India.html?hl=&id=2SuAzQEACAAJ",
          },
        },
      ],
    };
    spyOn(rService, "fetchRedditData").and.returnValue(of(object));
    component.fetchRedditList();
    expect(component.fetchRedditList).toBeTruthy();
  });

  it("should execute error condition of fetchRedditList", () => {
    let error = { statusCode: 404 };
    spyOn(rService, "fetchRedditData").and.returnValue(throwError(error));
    component.fetchRedditList();
    expect(component.fetchRedditList).toBeTruthy();
  });

  it("should execute navigate", () => {
    component.navigate(0);
    expect(component.navigate).toBeTruthy();
  });

  it("should execute editRow", () => {
    component.editRow(0);
    expect(component.editRow).toBeTruthy();
  });

  it("should execute deleteRow", () => {
    component.deleteRow(0);
    expect(component.deleteRow).toBeTruthy();
  });
});
