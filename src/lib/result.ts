/** 성공(Ok) 또는 실패(Err) 상태를 나타냅니다. */
export type Result<T, E> = Ok<T, E> | Err<T, E>;

/** 성공 상태의 Result를 생성합니다. */
export const ok = <T, E = never>(value: T): Ok<T, E> => new Ok(value);

/** 실패 상태의 Result를 생성합니다. */
export const err = <T = never, E = unknown>(error: E): Err<T, E> =>
  new Err(error);

interface IResult<T, E> {
  /**
   * 현재 인스턴스가 Ok 타입인지 확인합니다.
   * @returns Ok 타입이면 true, 아니면 false
   * @example
   * const result: Result<number, string> = ok(5);
   * console.log(result.isOk()); // true
   */
  isOk(): this is Ok<T, E>;

  /**
   * 현재 인스턴스가 Err 타입인지 확인합니다.
   * @returns Err 타입이면 true, 아니면 false
   * @example
   * const result: Result<number, string> = err("error");
   * console.log(result.isErr()); // true
   */
  isErr(): this is Err<T, E>;

  /**
   * 성공 값을 변환합니다.
   * @param f 변환 함수
   * @returns 새로운 Result 인스턴스
   * @example
   * ```
   * const result: Result<number, string> = ok(5);
   *
   * const doubled = result.map(x => x * 2);
   *
   * console.log(doubled); // Ok { value: 10 }
   * ```
   */
  map<U>(f: (value: T) => U): Result<U, E>;

  /**
   * 에러 값을 변환합니다.
   * @param f 변환 함수
   * @returns 새로운 Result 인스턴스
   * @example
   * ```
   * const result: Result<number, string> = err("error");
   *
   * const uppercased = result.mapErr(e => e.toUpperCase());
   *
   * console.log(uppercased); // Err { error: "ERROR" }
   * ```
   */
  mapErr<F>(f: (error: E) => F): Result<T, F>;

  /**
   * 성공 또는 실패에 따라 적절한 핸들러를 실행합니다.
   * @param handlers 성공과 실패 핸들러
   * @returns 핸들러의 결과
   * @example
   * ```
   * const result: Result<number, string> = ok(5);
   *
   * const message = result.match({
   *   ok: (value) => `Success: ${value}`,
   *   err: (error) => `Error: ${error}`
   * });
   *
   * console.log(message); // "Success: 5"
   * ```
   */
  match<R>(handlers: { ok: (value: T) => R; err: (error: E) => R }): R;

  /**
   * 성공 값 또는 기본값을 반환합니다.
   * @param defaultValue 기본값
   * @returns 성공 값 또는 기본값
   * @example
   * ```
   * const result: Result<number, string> = err("error");
   *
   * const value = result.unwrapOr(10);
   *
   * console.log(value); // 10
   * ```
   */
  unwrapOr<U>(defaultValue: U): T | U;
}

class Ok<T, E> implements IResult<T, E> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }

  map<U>(f: (value: T) => U): Result<U, E> {
    return ok(f(this.value));
  }

  mapErr<F>(_: (error: E) => F): Result<T, F> {
    return ok(this.value);
  }

  match<R>(handlers: { ok: (value: T) => R; err: (error: E) => R }): R {
    return handlers.ok(this.value);
  }

  unwrapOr<U>(_: U): T {
    return this.value;
  }
}

class Err<T, E> implements IResult<T, E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }

  map<U>(_: (value: T) => U): Result<U, E> {
    return err(this.error);
  }

  mapErr<F>(f: (error: E) => F): Result<T, F> {
    return err(f(this.error));
  }

  match<R>(handlers: { ok: (value: T) => R; err: (error: E) => R }): R {
    return handlers.err(this.error);
  }

  unwrapOr<U>(defaultValue: U): U {
    return defaultValue;
  }
}
