import { UnauthorizedException } from '@nestjs/common';
import { app } from './app';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

export const authContext = async ({ req }) => {
  try {
    const client = app
      .get<ClientGrpc>(AUTH_SERVICE_NAME)
      .getService<AuthServiceClient>(AUTH_SERVICE_NAME);

    const user = await lastValueFrom(
      client.authenticate({
        Authentication: req.headers?.authentication,
      }),
    );

    return { user };
  } catch (err) {
    console.log('JERE');
    throw new UnauthorizedException(err);
  }
};
