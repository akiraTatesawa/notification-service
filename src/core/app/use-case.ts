export abstract class UseCase<Request, Response> {
  public abstract execute(requestData: Request): Promise<Response>;
}
