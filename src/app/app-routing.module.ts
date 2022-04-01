import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalDetailComponent } from './journal/journal-detail/journal-detail.component';
import { JournalEditComponent } from './journal/journal-edit/journal-edit.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: '' , redirectTo: '/journal', pathMatch: 'full' },
  {path: 'journal', component: JournalComponent, children: [
    {path: 'new', component: JournalEditComponent},
    {path: ':id', component: JournalDetailComponent},
    { path: ':id/edit', component: JournalEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
