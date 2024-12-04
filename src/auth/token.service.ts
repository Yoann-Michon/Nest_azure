import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async saveToken(token: string, user: User): Promise<Token> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); 

    const newToken = this.tokenRepository.create({
      token,
      user, 
      expiresAt,
    });

    return this.tokenRepository.save(newToken);
  }
  
  async isTokenValid(token: string): Promise<boolean> {
    const foundToken = await this.tokenRepository.findOne({ where: { token } });
    if (foundToken && foundToken.expiresAt > new Date()) {
      return true;
    }
    return false;
  }
}
