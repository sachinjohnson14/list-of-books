import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BooksService } from "../books.service";

@Component({
  selector: "app-book-container",
  templateUrl: "./book-container.component.html",
  styleUrls: ["./book-container.component.scss"],
})
export class BookContainerComponent implements OnInit {
  cardData: any;
  constructor(private rService: BooksService, private router: Router) {}

  ngOnInit() {
    this.rService.rowData.subscribe((data) => {
      if (data) {
        this.cardData = data;
      } else {
        this.router.navigate(["/books"]);
      }
    });
  }
}
