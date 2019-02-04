import { Component, OnInit } from '@angular/core';
import { Chore } from '../../interfaces/chore';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.sass']
})
export class ChoresComponent implements OnInit {

  chores: Chore[] = [];
  people: Person[] = [];
  showResults = false;

  constructor() { }

  ngOnInit() {
    this.populatePeople();
    this.populateChores();
  }

  populatePeople() {
    this.people = [
      {
        id: 1,
        name: 'Brett',
        chores: []
      },
      {
        id: 2,
        name: 'Kethryn',
        chores: []
      }
    ]
  }

  populateChores() {
    this.chores = [
      {
        id: 1,
        title: 'Clean Bathroom',
        effort: 5
      },
      {
        id: 2,
        title: 'Trash Duty',
        effort: 2
      },
      {
        id: 3,
        title: 'Dish Duty',
        effort: 3
      },
      {
        id: 4,
        title: 'Vacuum',
        effort: 4
      },
      {
        id: 5,
        title: 'Make Bed',
        effort: 3
      },
      {
        id: 6,
        title: 'Feed Cat',
        effort: 3
      },
    ]
  }

  randomlyAssignChores () {
    let totalEffort = this.chores.map(ef => ef.effort).reduce((prev, next) => prev + next);
    let effortPerPerson = totalEffort / this.people.length;
    
  }
  

}
