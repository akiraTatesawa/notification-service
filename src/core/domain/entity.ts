import { randomUUID } from 'node:crypto';

export abstract class Entity<Props> {
  protected readonly _props: Props;

  public readonly id: string;

  constructor(props: Props, id?: string) {
    this._props = props;
    this.id = id ?? randomUUID();
  }
}
