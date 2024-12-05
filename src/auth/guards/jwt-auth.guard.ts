import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from '../../token/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector,
    private tokenService: TokenService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const isValid = await this.tokenService.isTokenValid(token);
      if (!isValid) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    } else {
      throw new UnauthorizedException('Token not found');
    }

    return super.canActivate(context) as  Promise<boolean>; 
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('Authentication failed');
    }
  
    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }
  
    return user;
  }
  
}