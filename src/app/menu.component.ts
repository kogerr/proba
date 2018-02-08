import { Component, EventEmitter, OnChanges } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MenuItem } from './menu-item';
import { Coordinated } from './coordinated';

@Component({
  selector: 'menu-box',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ],
  inputs: ['selected', 'columns'],
  outputs: ['emitter : selectedChange']
})

export class MenuComponent implements OnChanges {
  columns: number;
  selected: string;
  itemNames = ['Home', 'News', 'Forum', 'Account', 'FAQ'];
  emitter: EventEmitter<string> = new EventEmitter<string>();
  items: Array<MenuItem>;

  giveCoordinates = function(array: string[], width: number): Array<MenuItem> {
    let newArray = new Array<MenuItem>(array.length);
    let xMax = Math.floor(array.length / width);
    for (let i = 0; i < array.length; i++) {
      let x = Math.floor(i / width);
      let y = (i % width);
      let item = new MenuItem(array[i], x, y, 50, 80);
      newArray[i] = item;
    }
    this.empty = {x: xMax, y: (array.length % width)};
    return newArray;
  };

  seekRoute = function(x: number, y: number, route: Array<Coordinated>) {
    route = [{x: x, y: y}].concat(route);
    if (x === this.empty.x && y === this.empty.y) {
      return route;
    }
    if (this.empty.x > x) {
      return this.seekRoute(x + 1, y, route);
    }
    if (this.empty.x < x) {
      return this.seekRoute(x - 1, y, route);
    }
    if (this.empty.y > y) {
      return this.seekRoute(x, y + 1, route);
    }
    if (this.empty.y < y) {
      return this.seekRoute(x, y - 1, route);
    }
  };

  reorganize = function(item) {
    let route = this.seekRoute(item.x, item.y, []);
    for (let i = 1; i < route.length; i++) {
      let itemToMove = this.items.filter(a => (a.x === route[i].x && a.y === route[i].y))[0];
      itemToMove.moveTo(route[i - 1]);
    }
    this.empty = route[route.length - 1];
  };

  select = function(target): void {
    this.selected = target;
    this.emitter.emit(target);
  };

  ngOnChanges(changes) {
    if (changes.columns) {
      this.items = this.giveCoordinates(this.itemNames, this.columns);
    }
  }
}
