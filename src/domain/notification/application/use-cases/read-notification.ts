import { Either, left, right } from '@/core/either'
import { PermissionDeniedError } from '@/core/errors/errors/permission-denied-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | PermissionDeniedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new PermissionDeniedError())
    }

    notification.read()

    await this.notificationsRepository.update(notification)

    return right({
      notification,
    })
  }
}
