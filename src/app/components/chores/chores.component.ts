import { Component, OnInit, OnChanges } from '@angular/core';
import { Chore } from '../../interfaces/chore';
import { Person } from '../../interfaces/person';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.sass']
})
export class ChoresComponent implements OnInit, OnChanges {

  chores: Chore[] = [];
  people: Person[] = [];
  showResults = false;

  newPersonName: string;

  constructor() { }

  ngOnInit() {
    this.populatePeople();
    this.populateChores();
  }

  ngOnChanges() {
    console.log('changes called')
    localStorage.removeItem("people");
    localStorage.setItem("people", JSON.stringify(this.people));
    localStorage.removeItem("chores");
    localStorage.setItem("chores", JSON.stringify(this.chores));
    localStorage.removeItem("showResults");
    localStorage.setItem("showResults", JSON.stringify(this.showResults));
  }

  populatePeople() {
    this.people = [
      {
        id: 1,
        name: 'Brett',
        chores: [],
        effortCompleted: 0
      },
      {
        id: 2,
        name: 'Kethryn',
        chores: [],
        effortCompleted: 0
      }
    ]
  }

  populateChores() {
    this.chores = [
      {
        id: 1,
        title: 'Clean Bathroom',
        effort: 5,
        completed: false
      },
      {
        id: 2,
        title: 'Trash Duty',
        effort: 2,
        completed: false
      },
      {
        id: 3,
        title: 'Dish Duty',
        effort: 3,
        completed: false
      },
      {
        id: 4,
        title: 'Vacuum',
        effort: 4,
        completed: false
      },
      {
        id: 5,
        title: 'Make Bed',
        effort: 3,
        completed: false
      },
      {
        id: 6,
        title: 'Feed Cat',
        effort: 3,
        completed: false
      },
    ]
  }

  addPerson(form?: NgForm) {
    console.log(form.value)
    let person: Person = 
    {
      name: form.value.PersonName,
      id:  this.people.map(id => id.id).reduce((prev, next) => prev + next) + 1,
      chores: [],
      effortCompleted: 0
    }
    console.log(person)
    console.log(this.people)
    this.people.push(person);
  }

  addChore() {

  }

  resetChores() {
    this.people.forEach(person => {
      person.chores.forEach(chore => {
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

  clickedCheck(e, personId, choreId) {
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
