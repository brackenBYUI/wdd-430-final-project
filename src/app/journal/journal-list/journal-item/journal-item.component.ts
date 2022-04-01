import { Component, Input, OnInit } from '@angular/core';
import { Journal } from '../../journal.model';

@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.css']
})
export class JournalItemComponent implements OnInit {
  @Input()
  journal!: Journal;
  @Input()
  id!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
