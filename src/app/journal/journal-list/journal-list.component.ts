import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Journal } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.css']
})
export class JournalListComponent implements OnInit, OnDestroy {
  journals: Journal[] = [];
  private subscription: Subscription = new Subscription;

  constructor(private jorService: JournalService) { }

  ngOnInit(): void {
    this.journals = this.jorService.getJournals();

    this.subscription = this.jorService.journalChangedEvent.subscribe(
      (jourList: Journal[]) => {
        this.journals = jourList
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
