import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Journal } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.css']
})
export class JournalDetailComponent implements OnInit {
  journal!: Journal
  id!: number; 
  nativeWindow: any
  constructor(private jourService: JournalService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.journal = this.jourService.getJournal(this.id)
      }
    )
  }

  onDelete() {
    this.jourService.deleteJournal(this.journal)
    this.router.navigate(['/'])
  }

}
