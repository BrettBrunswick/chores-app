import { Component, OnInit, DoCheck } from '@angular/core';
import { Chore } from '../../interfaces/chore';
import { Person } from '../../interfaces/person';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.sass']
})
export class ChoresComponent implements OnInit, DoCheck {

  chores: Chore[] = [];
  people: Person[] = [];
  showResults: boolean;

  newPersonName: string;

  peopleSinceLastCheck: string;
  choresSinceLastCheck: string;
  showResultsSinceLastCheck: boolean;

  constructor() { }

  ngOnInit() {
    this.populatePeople();
    this.populateChores();
    this.showResults = JSON.parse(localStorage.getItem("showResults"));
  }

  ngDoCheck() {
    console.log('checked')
    if (this.peopleSinceLastCheck != JSON.stringify(this.people)) {
      localStorage.setItem("people", JSON.stringify(this.people));
      this.peopleSinceLastCheck = JSON.stringify(this.people);
      console.log('people changed')
    }
    if (this.choresSinceLastCheck != JSON.stringify(this.chores)) {
      localStorage.setItem("chores", JSON.stringify(this.chores));
      this.choresSinceLastCheck = JSON.stringify(this.chores);
      console.log('chores changed')
    }
    if (this.showResultsSinceLastCheck != this.showResults) {
      localStorage.setItem("showResults", JSON.stringify(this.showResults));
      this.showResultsSinceLastCheck = this.showResults;
      console.log('showResults changed')
    }
  }

  populatePeople() {
    this.people = JSON.parse(localStorage.getItem("people"));
    this.peopleSinceLastCheck = JSON.stringify(this.people);
  }

  populateChores() {
    this.chores = JSON.parse(localStorage.getItem("chores"));
    this.choresSinceLastCheck = JSON.stringify(this.chores);
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  addPerson(form: NgForm) {
    let person: Person = 
    {
      name: form.value.PersonName,
      id:  this.people.length > 0 ? this.people.map(id => id.id).reduce((prev, next) => prev + next) + 1 : 1,
      chores: [],
      effortCompleted: 0
    }
    this.people.push(person);
  }

  deletePerson(personId) {
    let chore = this.people.filter(chr => chr.id == personId).pop();
    let index = this.people.indexOf(chore);
    this.people.splice(index, 1)
  }

  addChore(form: NgForm) {
    console.log(form.value)
    let chore: Chore = 
    {
      title: form.value.ChoreName,
      id:  this.chores.length > 0 ? this.chores.map(id => id.id).reduce((prev, next) => prev + next) + 1 : 1,
      completed: false,
      effort: form.value.Effort
    }
    this.chores.push(chore);
  }

  deleteChore(choreId) {
    let chore = this.chores.filter(chr => chr.id == choreId).pop();
    let index = this.chores.indexOf(chore);
    this.chores.splice(index, 1)
  }

  resetChores() {
    this.people.forEach(person => {
      person.chores.forEach(chore => {
        chore.completed = false;
        this.chores.push(chore);
      })
      person.chores.splice(0, person.chores.length)
      person.effortCompleted = 0;
    });
    this.showResults = false;
  }

  randomlyAssignChores () {
    let tempChores = this.shuffle(this.chores);
    
    while (tempChores.length > 0) {
        let indexOfMinEffort = this.indexOfPersonWithMinEffort(this.people);
        let choreToAssign = tempChores.pop()
        this.people[indexOfMinEffort].chores.push(choreToAssign);
    }
    this.showResults = true;
  }

  clickedCompleted(e, personId, choreId) {
    let person = this.people.filter(pers => pers.id == personId).pop();
    let chore = person.chores.filter(chr => chr.id == choreId).pop();

    if(e.target.checked) {
      chore.completed = true;
    } else {
      chore.completed = false;
    }
    person.effortCompleted = this.percentEffortCompletedByPerson(person);
  } 

  percentEffortCompletedByPerson(person: Person) {
    let totalEffort = this.totalEffortForPerson(person);
    let completedEffort = this.effortCompletedForPerson(person);
    return (completedEffort/totalEffort) * 100;
  }

  effortRemaining(person: Person) {
    let totalEffort = this.totalEffortForPerson(person);
    let completedEffort = this.effortCompletedForPerson(person);
    return totalEffort - completedEffort;
  }

  private indexOfPersonWithMinEffort(arr: Person[]) {
    if (arr.length === 0) {
        return -1;
    }

    var min = this.totalEffortForPerson(arr[0]);
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (this.totalEffortForPerson(arr[i]) < min) {
            minIndex = i;
            this.totalEffortForPerson(arr[i])
        }
    }
    return minIndex;
}

  private totalEffortForPerson(array): number {
    var total = 0;
    for (var i = 0; i < array.chores.length; i++) {
      total = total + array.chores[i].effort;
    }
    return total;
  }

  private effortCompletedForPerson(array): number {
    var total = 0;
    for (var i = 0; i < array.chores.length; i++) {
      if (array.chores[i].completed) {
        total = total + array.chores[i].effort;
      }
    }
    return total;
  }

  private shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  

}
