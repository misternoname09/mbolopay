import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    if (!requiredPermissions) {
      return true; // No specific permissions required, just being ADMIN is enough
    }

    const userPermissions = user.permissions || [];
    
    // Super Admin can do everything
    if (userPermissions.includes('SUPER_ADMIN')) {
      return true;
    }

    const hasPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));
    if (!hasPermission) {
      throw new ForbiddenException(`Permission insuffisante. Requis : ${requiredPermissions.join(' ou ')}`);
    }

    return true;
  }
}
