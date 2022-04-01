import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JournalComponent } from './journal/journal.component';
import { JournalListComponent } from './journal/journal-list/journal-list.component';
import { JournalDetailComponent } from './journal/journal-detail/journal-detail.component';
import { JournalEditComponent } from './journal/journal-edit/journal-edit.component';
import { JournalItemComponent } from './journal/journal-list/journal-item/journal-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JournalComponent,
    JournalListComponent,
    JournalDetailComponent,
    JournalEditComponent,
    JournalItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
