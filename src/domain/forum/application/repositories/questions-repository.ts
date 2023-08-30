import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findQuestionById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
}
