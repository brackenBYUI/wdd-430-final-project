import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Journal } from './journal.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  journalChangedEvent = new Subject<Journal[]>()

  private journals: Journal[] = [];

  constructor(private http: HttpClient) { }

  getJournals(): Journal[]{
    this.http.get<Journal[]>('http://localhost:3000/journal').subscribe(
      (journals: Journal[]) => {
        this.journals = journals
        this.journals.sort((curEl, nextEl) => {
          if(curEl.date < nextEl.date) {
            return 1
          } else if (curEl.date > nextEl.date) {
            return -1
          } else {
            return 0
          }
        })
        this.journalChangedEvent.next(this.journals.slice())
      },
      (error: any) => {
        console.log(error)
      } 
    )
    return this.journals.slice()
  }

  getJournal(id: number): Journal {
    for(let jour of this.journals) {
      if(jour._id == id) {
        return jour
      }
    }
    return this.journals[0]
  }

  addJournal(journal: Journal) {
    if(!journal) {
      return
    }

    this.http.post<{ message: string, journal: Journal}>('http://localhost:3000/journal', journal,
      {headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(
      (responseData) => {
        this.journals.push(responseData.journal)
        this.storeJournals()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  updateJournal(originalJournal: Journal, newJournal: Journal) {
    if(!originalJournal || !newJournal) {
      return
    }

    const pos = this.journals.findIndex(d => d._id === originalJournal._id)

    if(pos < 0) {
      return
    }

    newJournal._id = originalJournal._id

    this.http.put('http://localhost:3000/journal/' + originalJournal._id, newJournal, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe(
      () => {
        this.journals[pos] = newJournal
        this.storeJournals()
      }
    )
  }

  deleteJournal(journal: Journal) {
    if(!journal) {
      return
    }

    const pos = this.journals.findIndex(d => d._id === journal._id)

    if(pos < 0) {
      return
    }

    this.http.delete('http://localhost:3000/journal/' + journal._id)
      .subscribe(
        () => {
          this.journals.slice(pos, 1)
          this.storeJournals()
        }
      )
  }

  storeJournals() {
    let newJourArray = JSON.stringify(this.getJournals)
    this.http.put('http://localhost:3000/journal', newJourArray, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }). subscribe(response => {
      this.journalChangedEvent.next(this.journals.slice())
    })
  }
}
