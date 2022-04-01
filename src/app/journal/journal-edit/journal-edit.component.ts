import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Journal } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.css']
})
export class JournalEditComponent implements OnInit {
  originalJournal!: Journal;
  journal!: Journal;
  editMode: boolean = false
  subscription!: Subscription;

  constructor(private jourService: JournalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if(!id) {
          this.editMode = false
          return
        }
        this.originalJournal = this.jourService.getJournal(id)
        if(!this.originalJournal) {
          return
        }
        this.editMode = true
        this.journal = JSON.parse(JSON.stringify(this.originalJournal))
      }
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit(form: NgForm) {
    const value = form.value
    let newJournal = new Journal(0, Date.now(), value.content)

    if (this.editMode) {
      this.jourService.updateJournal(this.originalJournal, newJournal)
    } else {
      this.jourService.addJournal(newJournal)
    }

    this.router.navigate(['/'])
  }
}
