import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, Article, SearchArticleResult, SearchArticleParam } from '../data.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.less']
})
export class ArticleSearchComponent implements OnInit, OnDestroy {

  public articleSearchParam$ = new Subject<SearchArticleParam>();
  public articleSearchTerm: string;
  public currentPage = 0;
  public viewArticles: Array<Article>;
  public numberPages: number;


  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.articleSearchParam$
      .pipe(
        debounceTime(600),
        filter(param => param.term.length > 0),
        distinctUntilChanged(),
        switchMap((param) => {
          return this.dataService.searchArticle(param);
        })
      )
      .subscribe((result: SearchArticleResult) => {
        this.viewArticles = result.articles;
        this.currentPage = result.page;
        this.numberPages = result.nbPages;
      },
        (err) => console.log('error', err)
      );
  }

  ngOnDestroy() {
    this.articleSearchParam$.unsubscribe();
  }

  updateSearchTerm(searchTerm) {
    this.currentPage = 0;
    this.numberPages = undefined;
    this.articleSearchTerm = searchTerm;
    this.searchAction(this.articleSearchTerm, this.currentPage);
  }

  previousPage(searchTerm, currentPage) {
    if (searchTerm && searchTerm.length > 0 && currentPage > 0) {
      this.currentPage = currentPage - 1;
      this.articleSearchTerm = searchTerm;
      this.searchAction(this.articleSearchTerm, this.currentPage);
    }
  }

  nextPage(searchTerm, currentPage, numberPages) {
    if (searchTerm && searchTerm.length > 0 && currentPage < numberPages) {
      this.currentPage = currentPage + 1;
      this.articleSearchTerm = searchTerm;
      this.searchAction(this.articleSearchTerm, this.currentPage);
    }
  }

  searchAction(searchTerm, currentPage) {
    this.articleSearchParam$.next({ term: searchTerm, page: currentPage });
  }
}
