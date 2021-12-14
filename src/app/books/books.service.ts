import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  public rowData = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  /**
   * API call to fetch reddit data
   * @param redditUrl
   * @param subReddit
   * @param after
   * @returns
   */
  fetchRedditData(redditUrl): Observable<any> {
    return this.http.get(`${redditUrl}`);
  }
}
