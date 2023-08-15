import { randomUUID } from "node:crypto"

export class Mentor {
  public id: string
  public name: string

  constructor(title: string, id?:string) {
    this.name = title
    this.id = id ?? randomUUID()
  }
}