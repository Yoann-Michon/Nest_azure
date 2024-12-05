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
    try {  
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
  
      const existingToken = await this.tokenRepository.findOne({ 
        where: { user: { id: user.id } }
      });
  
      if (existingToken) {
        return await this.tokenRepository.save({
          ...existingToken,
          token: token,
          expiresAt: expiresAt
        });
      } else {
        const newToken = this.tokenRepository.create({
          token,
          user: { id: user.id },
          expiresAt
        });
  
        return await this.tokenRepository.save(newToken);
      }
    } catch (error) {
      console.error('Token save/update error:', {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
        userData: { 
          id: user?.id, 
          username: user?.username 
        },
        tokenLength: token.length
      });
      
      throw new Error(`Failed to save or update token: ${error.message}`);
    }
  }
  
  async isTokenValid(token: string): Promise<boolean> {
    const foundToken = await this.tokenRepository.findOne({ where: { token } });
    if (foundToken && foundToken.expiresAt > new Date()) {
      return true;
    }
    return false;
  }
}
