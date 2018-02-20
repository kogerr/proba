import { Coordinated } from './coordinated';

export class MenuItem implements Coordinated {
  text: string;
  x: number;
  y: number;
  positionX: number;
  positionY: number;
  height: number;
  width: number;

  constructor (text: string, x: number, y: number, height: number, width: number) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.positionX = this.x * height;
    this.positionY = this.y * width;
  }

  private movement: any;

  moveTo(target): void {
    let diffX = target.x - this.x;
    let diffY = target.y - this.y;
    this.x = target.x;
    this.y = target.y;
    let self = this;
    this.movement = setInterval(function() {
      if (self.positionX !== (self.x * self.height) || self.positionY !== (self.y * self.width)) {
        self.positionX = self.positionX + diffX;
        self.positionY = self.positionY + diffY;
      } else {
        clearInterval(self.movement);
      }
    }, 10);
  }
}
