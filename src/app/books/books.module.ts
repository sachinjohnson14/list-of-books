import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BooksRoutingModule } from "./books-routing.module";
import { BookContainerComponent } from "./book-container/book-container.component";
import {
  BookListComponent,
  DialogOverviewExampleDialog,
} from "./book-list/book-list.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    BookContainerComponent,
    BookListComponent,
    DialogOverviewExampleDialog,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
  ],
  entryComponents: [DialogOverviewExampleDialog],
})
export class BooksModule {}
