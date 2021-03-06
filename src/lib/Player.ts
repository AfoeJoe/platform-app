// eslint-disable-next-line import/no-cycle
import { gravity, jumpSpeed, playerXSpeed } from './const';
import State from './State';
import Vec from './Vec';

export interface IPlayer {
  type: string;
  player: string;
  pos: Vec;
  size: Vec;
  update(time: number, state: State, keys: any): Player;
  collide(state: State): State;
}

class Player implements IPlayer {
  player = 'player';

  constructor(public pos: Vec, private speed: any) {}

  size = new Vec(0.8, 1.5);

  get type() {
    return this.player;
  }

  static create(pos: any) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }

  update(time: number, state: State, keys: Record<string, boolean>) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let { pos } = this;
    const movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, 'wall')) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    const movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, 'wall')) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }

    return new Player(pos, new Vec(xSpeed, ySpeed));
  }

  collide(state: State): State {
    console.log(this);
    return state;
  }
  // static size = new Vec(0.8, 1.5);
}

// Player.prototype.size = new Vec(0.8, 1.5);

export default Player;

export type TPlayer = typeof Player;
