import { Entity } from "../../core/entities/entity"

interface MentorProps {
  name: string
}

export class Mentor extends Entity<MentorProps> {}