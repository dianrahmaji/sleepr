import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@app/common';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }

  const user = context.getArgs()[2]?.req.headers.user;

  if (user) {
    return JSON.parse(user);
  }
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
