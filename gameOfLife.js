import _ from 'lodash'

const NEIGHBORS = [
  {x: 1, y: 0},
  {x: -1, y: 0},
  {x: 0, y: 1},
  {x: 0, y: -1},
  {x: 1, y: 1},
  {x: 1, y: -1},
  {x: -1, y: 1},
  {x: -1, y: -1}
]

class GameOfLife {
  constructor(x, y) {
    let row = [];
    _.times(x, () => {
      row.push(0);
    })

    this.matrix = [];
    _.times(y, () => {
      this.matrix.push(_.clone(row));
    })
  }

  get(x, y) {
    if (y < 0 || x < 0) {
      return 0;
    }
    if (y > (this.matrix.length - 1) || x > (this.matrix[0].length - 1)) {
      return 0;
    }
    return this.matrix[y][x];
  }

  set(x, y, value) {
    if (y < 0 ||
        x < 0 ||
        y > (this.matrix.length - 1) ||
        x > (this.matrix[0].length - 1)
    ) { return 0; }
    this.matrix[y][x] = value;
  }

  getNeighborValue(x, y) {
    let value = 0;
    _.each(NEIGHBORS, (neighbor) => {
      value += this.get(x + neighbor.x, y + neighbor.y);
    })
    return value;
  }

  forEach(fn) {
    _.forEach(this.matrix, (row, y) => {
      _.forEach(row, (value, x) => {
        fn(x, y, value);
      });
    });
  }

  display() {
    return _.map(this.matrix, (row, y) => {
      return _.map(row, (value, x) => value).join(' ');
    }).join('\n');
  }

  step() {
    let next = _.cloneDeep(this.matrix);
    this.forEach((x, y, cv) => {
      let nv = this.getNeighborValue(x, y);
      // Die by underpopulation.
      if (cv == 1 && nv < 2) {
        next[y][x] = 0
      }
      // Die by overpopulation.
      else if (cv == 1 && nv > 3) {
        next[y][x] = 0
      }
      // Reproduction
      else if (cv == 0 && nv == 3) {
        next[y][x] = 1
      }
    });
    this.matrix = next;
  }
}

export default GameOfLife
