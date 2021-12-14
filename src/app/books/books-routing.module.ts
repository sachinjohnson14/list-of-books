import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookContainerComponent } from "./book-container/book-container.component";
import { BookListComponent } from "./book-list/book-list.component";

const routes: Routes = [
  {
    path: "",
    component: BookListComponent,
  },
  {
    path: "details",
    component: BookContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
