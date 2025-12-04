import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password } = signupDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Générer le token JWT
    const token: string = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Inscription réussie',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Générer un token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }
}
