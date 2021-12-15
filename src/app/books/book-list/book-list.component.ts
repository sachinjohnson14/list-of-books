import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DialogData, RedditList } from "src/app/common-interface";
import { BooksService } from "../books.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit {
  redditList: RedditList[] = [];
  redditUrl: string = "https://www.googleapis.com/books/v1/volumes?q=isbn";
  subReddit: string;
  constructor(
    private rService: BooksService,
    private spinner: NgxSpinnerService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchRedditList();
  }

  /**
   * fetch records from particular subreddit 25 at a time
   * @param subReddit
   */
  fetchRedditList() {
    this.spinner.show();
    this.rService.fetchRedditData(this.redditUrl).subscribe(
      (data) => {
        this.spinner.hide();
        data.items.forEach((child) => {
          this.redditList.push({
            title: child.volumeInfo.title,
            pageCount: child.volumeInfo.pageCount,
            language: child.volumeInfo.language
              ? child.volumeInfo.language
              : "--",
            description: child.volumeInfo.description,
            authors: child.volumeInfo.authors
              ? child.volumeInfo.authors.join()
              : "--",
            infoLink: child.volumeInfo.infoLink,
            subtitle: child.volumeInfo.subtitle
              ? child.volumeInfo.subtitle
              : "--",
            publishedDate: child.volumeInfo.publishedDate,
          });
        });
      },
      (error) => {
        this.spinner.hide();
        this.snackbar.open("Something went wrong", "X", {
          duration: 5000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
          panelClass: ["error"],
        });
      }
    );
  }

  navigate(i) {
    this.rService.rowData.next(this.redditList[i]);
    this.router.navigate(["books/details"]);
  }

  /**
   * Edit details of a particular row
   * @param i
   */
  editRow(i) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "450px",
      data: {
        title: this.redditList[i].title,
        authors: this.redditList[i].authors,
        language: this.redditList[i].language,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.redditList[i].title = result.title;
      this.redditList[i].authors = result.authors;
      this.redditList[i].language = result.language;
    });
  }

  /**
   * Delete a particular row
   * @param i
   */
  deleteRow(i) {
    this.redditList.splice(i, 1);
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  template: ` <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Enter Title</mat-label>
        <input type="text" matInput [(ngModel)]="data.title" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Enter Authors</mat-label>
        <input type="text" matInput [(ngModel)]="data.authors" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Enter Language</mat-label>
        <input type="text" matInput [(ngModel)]="data.language" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      mat-form-field {
        width: 100% !important;
      }
    `,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
