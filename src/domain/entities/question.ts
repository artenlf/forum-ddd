import { randomUUID } from "node:crypto"

interface questionProps {
  title: string 
  content: string
  slug: string
  authorId: string
}

export class Question {
  public id: string
  public title: string
  public content: string
  public slug: string
  public authorId: string

  constructor({ title, content, slug, authorId }: questionProps, id?:string) {
    this.title = title
    this.content = content
    this.slug = slug
    this.authorId = authorId
    this.id = id ?? randomUUID()
  }
}