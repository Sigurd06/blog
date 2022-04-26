import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @CreateDateColumn()
  public readonly createdAt?: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;
}
