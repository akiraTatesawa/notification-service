export class InvalidParamsError extends Error {
  private constructor(message?: string) {
    super(message);
  }

  public static create(message: string): InvalidParamsError {
    const errorMessage: string = message ?? 'Invalid Params';

    return new InvalidParamsError(errorMessage);
  }
}
