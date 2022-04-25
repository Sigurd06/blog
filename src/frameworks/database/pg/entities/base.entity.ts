import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @CreateDateColumn()
  public readonly createdAt?: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;

  @DeleteDateColumn()
  public readonly deletedAt?: Date;
}
