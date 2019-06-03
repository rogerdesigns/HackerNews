import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleSearchComponent } from './article-search/article-search.component';

const routes: Routes = [
  {
    path: 'article-search',
    component: ArticleSearchComponent
  },
  {
    path: '',
    redirectTo: 'article-search',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
