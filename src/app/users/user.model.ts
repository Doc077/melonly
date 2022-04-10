import { Column, Entity, Model } from '@melonly/core'

@Model()
export class User extends Entity {
  @Column()
  public id: number

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public createdAt: Date
}
