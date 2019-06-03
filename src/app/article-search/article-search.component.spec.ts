import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleSearchComponent } from './article-search.component';
import { of } from 'rxjs';
import { SearchArticleResult, DataService } from '../data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArticleSearchComponent', () => {
  let fixture: ComponentFixture<ArticleSearchComponent>;
  let mockDataService;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj(['searchArticle']);

    TestBed.configureTestingModule({
      declarations: [ArticleSearchComponent],
      providers: [
        {
          provide: DataService,
          useValue: mockDataService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ArticleSearchComponent);
  });

  it('should call previousPage', () => {
    fixture.componentInstance.previousPage('abc', 5);

    expect(fixture.componentInstance.currentPage).toBe(4);
    expect(fixture.componentInstance.articleSearchTerm).toBe('abc');
  });

  it('should call nextPage', () => {
    fixture.componentInstance.nextPage('xyz', 5, 10);

    expect(fixture.componentInstance.currentPage).toBe(6);
    expect(fixture.componentInstance.articleSearchTerm).toBe('xyz');
  });

});

