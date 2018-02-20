import { Component, EventEmitter, OnChanges, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MenuItem } from './menu-item';
import { Coordinated } from './coordinated';

@Component({
  selector: 'menu-box',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.min.css' ]
})

export class MenuComponent implements OnChanges {
  @Input()
  private columns: number;
  @Input()
  private selected: string;
  private itemNames = ['Home', 'News', 'Forum', 'Account', 'FAQ'];
  @Output()
  private selectedChange: EventEmitter<string> = new EventEmitter<string>();
  private items: Array<MenuItem>;
  private menuWidth: number;
  private menuHeight: number;
  private empty: Coordinated;

  giveCoordinates(array: string[], width: number): Array<MenuItem> {
    const newArray = new Array<MenuItem>(array.length);
    const xMax = Math.floor(array.length / width);
    for (let i = 0; i < array.length; i++) {
      let x = Math.floor(i / width);
      let y = (i % width);
      let item = new MenuItem(array[i], x, y, 50, 80);
      newArray[i] = item;
    }
    this.empty = {x: xMax, y: (array.length % width)};
    return newArray;
  }

  seekRoute(x: number, y: number, route: Array<Coordinated>): Array<Coordinated> {
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
  }

  reorganize(item): void {
    let route = this.seekRoute(item.x, item.y, []);
    for (let i = 1; i < route.length; i++) {
      let itemToMove = this.items.filter(a => (a.x === route[i].x && a.y === route[i].y))[0];
      itemToMove.moveTo(route[i - 1]);
    }
    this.empty = route[route.length - 1];
  }

  select(target): void {
    this.selected = target;
    this.selectedChange.emit(target);
  }

  ngOnChanges(changes): void {
    if (changes.columns) {
      this.items = this.giveCoordinates(this.itemNames, this.columns);
      this.menuWidth = this.columns * 80;
      this.menuHeight = Math.ceil(this.itemNames.length / this.columns) * 50;
    }
  }
}
