import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { ArticleSearchComponent } from './article-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [DataService]
})
export class ArticleSearchModule { }
