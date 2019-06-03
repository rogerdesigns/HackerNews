import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Article {
  author: string;
  title: string;
  url: string;
}

export interface SearchArticleResult {
  articles: Array<Article>;
  page: number;
  nbPages: number;
}

export interface SearchArticleParam {
  term: string;
  page: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  searchArticle(param: SearchArticleParam): Observable<any> {
    return this.http.get<any>(`http://hn.algolia.com/api/v1/search?query=${param.term}&tags=story&page=${param.page}&hitsPerPage=10`, {
      headers: new HttpHeaders({
        Accept: 'Application/json'
      })
    })
      .pipe(
        map((result): SearchArticleResult => {

          const myArticles = result.hits.map((r) => {
            return {
              author: r.author,
              title: r.title,
              url: r.url
            };
          });

          return {
            articles: myArticles,
            page: result.page,
            nbPages: result.nbPages
          };
        })
      );
  }

}
