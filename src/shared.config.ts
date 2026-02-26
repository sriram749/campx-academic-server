import { MessagePattern as Pattern } from '@nestjs/microservices';

export interface IMessageProps {
  cmd: string;
  action: string;
}

/**
 * Wraps NestJS MessagePattern with service identifier.
 * Matches the same pattern the API Gateway uses when sending to the academic queue.
 */
export const MessagePattern = (props: IMessageProps) => {
  return Pattern({ service: 'academic', ...props });
};
