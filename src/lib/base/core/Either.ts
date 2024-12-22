export abstract class Either<L, R> {
  abstract fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T;

  isLeft(): boolean {
    return this.fold(
      () => true,
      () => false
    );
  }

  isRight(): boolean {
    return this.fold(
      () => false,
      () => true
    );
  }
}

export class Right<L, R> extends Either<L, R> {
  readonly right: R;
  constructor(right: R) {
    super();
    this.right = right;
  }

  fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T {
    return onRight(this.right);
  }
}

export class Left<L, R> extends Either<L, R> {
  readonly left: L;
  constructor(left: L) {
    super();
    this.left = left;
  }

  fold<T>(onLeft: (left: L) => T, onRight: (right: R) => T): T {
    return onLeft(this.left);
  }
}
