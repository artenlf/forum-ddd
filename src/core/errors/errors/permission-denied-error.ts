import { UseCaseError } from '@/core/errors/use-case-error'

export class PermissionDeniedError extends Error implements UseCaseError {
  constructor() {
    super('Permission denied')
  }
}
