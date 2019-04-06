export interface Condition<T> {
  or(condition: Condition<T>): Condition<T>;
  and(condition: Condition<T>): Condition<T>;
  match(authCodeSet: T): boolean;
}

class ConditionImpl<T> implements Condition<T> {

  private judge: (obj: T) => boolean;

  constructor(p: (obj: T) => boolean) {
    this.judge = p;
  }

  or(condition: Condition<T>): Condition<T> {

    return new ConditionImpl((obj: T) => {
      return this.judge(obj) || (condition as ConditionImpl<T>).judge(obj);
    });
  }

  and(condition: Condition<T>): Condition<T> {
    return new ConditionImpl((obj: T) => {
      return this.judge(obj) && (condition as ConditionImpl<T>).judge(obj);
    });
  }

  match(authCodeSet: T): boolean {
    return this.judge(authCodeSet);
  }
}
export const PermissionExpression = {
  /** Requires permission to have one of authCodes */
  oneOf: (...authCodes: string[]): Condition<Set<string>> => {
    return new ConditionImpl<Set<string>>((codes: Set<string>) => {
      for (let index = 0; index < authCodes.length; index += 1) {
        const element = authCodes[index];
        if (!element) { continue; }
        if (codes.has(element)) {
          return true;
        }
      }

      return false;
    });
  },
  /** Requires permission to have all of authCodes */
  has: (...authCodes: string[]): Condition<Set<string>> => {
    return new ConditionImpl<Set<string>>((codes: Set<string>) => {
      for (let index = 0; index < authCodes.length; index += 1) {
        const element = authCodes[index];
        if (!element) { continue; }
        if (!codes.has(element)) {
          return false;
        }
      }

      return true;
    });
  },
  /** Cannot have any permission in authCodes */
  hasNot: (authCodes: string[]): Condition<Set<string>> => {
    return new ConditionImpl<Set<string>>((codes: Set<string>) => {
      for (let index = 0; index < authCodes.length; index += 1) {
        const element = authCodes[index];
        if (!element) { continue; }
        if (codes.has(element)) {
          return false;
        }
      }

      return true;
    });
  },
  /** Don't need any permissions, public permission */
  pub(): Condition<Set<string>> {
    return new ConditionImpl<Set<string>>((codes: Set<string>) => {
      return true;
    });
  },
}
