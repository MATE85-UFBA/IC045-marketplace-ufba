import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Valide o usuário no banco de dados (exemplo simplificado)
    const user = await this.findUserByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async findUserByUsername(username: string) {
    // Simulação de um banco de dados fake
    const fakeUsers = [
      {
        id: 1,
        username: 'joao',
        password: await bcrypt.hash('123456', 10), // Senha criptografada
      },
      {
        id: 2,
        username: 'maria',
        password: await bcrypt.hash('123456', 10),
      },
    ];

    // Busca o usuário no array fake
    return fakeUsers.find((user) => user.username === username);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
