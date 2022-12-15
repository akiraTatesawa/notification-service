export class GuardSuccess {
  public readonly succeeded: boolean;

  constructor() {
    this.succeeded = true;
  }

  public isFailure(): this is GuardFail {
    return false;
  }
}

export class GuardFail {
  public readonly succeeded: boolean;

  public readonly message: string;

  constructor(message: string) {
    this.message = message;
    this.succeeded = false;
  }

  public isFailure(): this is GuardFail {
    return true;
  }
}

export class Guard {
  public static againstEmptyString(arg: string, argName: string): GuardSuccess | GuardFail {
    if (arg.length === 0) {
      return new GuardFail(`${argName} cannot be an empty string`);
    }

    return new GuardSuccess();
  }

  public static againstNonUUID(arg: string, argName: string): GuardSuccess | GuardFail {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(arg)) {
      return new GuardFail(`${argName} must be a valid UUID`);
    }

    return new GuardSuccess();
  }

  public static combine(results: Array<GuardSuccess | GuardFail>): GuardSuccess | GuardFail {
    const firstFailure = results.find((result) => result.isFailure());

    if (!firstFailure) {
      return new GuardSuccess();
    }

    return firstFailure;
  }
}
