import { HandsService } from './hands.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Card {
  letter: string
  clicked: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'poker-math';
  cards: Card[][];
  clicked = false;
  handsSelected = 0;
  totalHandsPossible = 169;
  percentageOfHandsSelected = 0;
  board = '';

  constructor(service: HandsService) {
    this.cards = service.getHands()
  }

  ngOnInit() {

  }

  //O of n squared
  traverseCards(letter: string): void {
    this.cards.forEach(array => {
      array.forEach(obj => {
        if (obj.letter === letter) {
          obj.clicked = !obj.clicked;
        }
      });
    });
  }

  findNumberOfHandsSelected(): number {
    let counter = 0;
    this.cards.forEach(array => {
      array.forEach(obj => {
        if (obj.clicked === true) {
          counter += 1;
        }
      });
    });
    return counter
  }

  findPercentageOfHandsSelected(): number {
    return (this.handsSelected / this.totalHandsPossible);
  }

  clickHand = event => {
    let target = event.target || event.srcElement || event.currentTarget
    let idAtt = target.attributes.id
    let value = idAtt.nodeValue
    this.traverseCards(value)
    this.handsSelected = this.findNumberOfHandsSelected()
    this.percentageOfHandsSelected = this.findPercentageOfHandsSelected()
  }

  onChange = () => {
    console.log('board: ',this.board)
  }

}

