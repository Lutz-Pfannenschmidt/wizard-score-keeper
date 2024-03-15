export function make2DArray(rows: number, cols: number): number[][] {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols).fill(null);
  }
  return arr as number[][];
}

export function parsePlayerNames(players: string): string[] {
  return players.split(",");
}

export function parse2DArray(input: string, players: number, rounds: number): number[][] {
  let arr = make2DArray(players, rounds);
  if (!input) {
    return arr;
  }
  let ps = input.split(";");
  for (let i = 0; i < ps.length; i++) {
    let p = ps[i].split(",");
    for (let j = 0; j < p.length; j++) {
      arr[i][j] = parseInt(p[j]);
    }
  }
  return arr;
}

export function string2DArray(arr: number[][]): string {
  return arr.map((p) => p.join(",")).join(";").replaceAll("NaN", "").replaceAll("null", "");
}

export function sumArray(arr: number[]): number {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      num += arr[i];
    }
  }
  return num;
}