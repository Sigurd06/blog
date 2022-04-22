import { createHash } from 'crypto';

export class GenerateHash {
  public static md5(data: string) {
    return createHash('md5').update(data).digest('hex');
  }
}
