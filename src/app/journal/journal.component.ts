import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit, OnDestroy {
  selectedJournal: Journal[] = [];
  private subscription: Subscription = new Subscription;

  constructor(private jorService: JournalService) { }

  ngOnInit(): void {
    this.subscription = this.jorService.journalChangedEvent.subscribe(
      (journal: Journal[]) => {
        this.selectedJournal = journal
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
