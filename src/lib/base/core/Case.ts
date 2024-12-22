import StatusResponse from "../response/StatusResponse";

export class Case<T> {
    readonly data?: T | null;
    readonly failure: StatusResponse | null;
  
    constructor(data?: T | null, failure?: StatusResponse | null) {
      if (failure) {
        this.data = null;
        this.failure = failure;
      } else {
        this.data = data ?? null;
        this.failure = new StatusResponse({});
      }
    }
  }
  
  export class InitialCase<T> extends Case<T> {}
  
  export class LoadingCase<T> extends Case<T> {}
  
  export class CancelCase<T> extends Case<T> {}
  
  export class SuccessCase<T> extends Case<T> {
    constructor(result: T | null) {
      super(result);
    }
  }
  
  export class ErrorCase<T> extends Case<T> {
    constructor(failure: StatusResponse | null) {
      super(null, failure);
    }
  }
  