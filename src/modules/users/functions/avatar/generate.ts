import { GenerateHash } from '../hashed/md5';

export class Generate {
  static avatar(email: string): string {
    const hash = GenerateHash.md5(email);
    return `https://www.gravatar.com/avatar/${hash}?d=robohash&r=g`;
  }
}
