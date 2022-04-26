export abstract class IGenericRedisService {
  public abstract getSessionValue(
    type: string,
    key: string,
  ): Promise<string | number>;
  public abstract setSessionValue(
    type: string,
    id: string,
    token: string,
    expiredAt: number,
  ): Promise<void>;
  public abstract deleteSessionValue(value: string): Promise<void>;
  public abstract existsKey(type: string, key: string): Promise<number>;
}
