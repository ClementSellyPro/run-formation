"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InscriptionsService = class InscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, formationId) {
        const existing = await this.prisma.inscription.findUnique({
            where: {
                userId_formationId: { userId, formationId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Vous êtes déjà inscrit à cette formation');
        }
        return this.prisma.inscription.create({
            data: { userId, formationId },
            include: {
                formation: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        domaine: true,
                        duration: true,
                        content: true,
                    },
                },
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.inscription.findMany({
            where: { userId },
            include: {
                formation: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        domaine: true,
                        duration: true,
                    },
                },
            },
            orderBy: { status: 'asc' },
        });
    }
    async findPending() {
        return this.prisma.inscription.findMany({
            where: { status: 'PENDING' },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                formation: {
                    select: {
                        id: true,
                        title: true,
                        domaine: true,
                    },
                },
            },
            orderBy: { id: 'desc' },
        });
    }
    async approve(id) {
        const inscription = await this.prisma.inscription.findUnique({
            where: { id },
        });
        if (!inscription) {
            throw new common_1.NotFoundException('Inscription introuvable');
        }
        return this.prisma.inscription.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
    }
    async reject(id) {
        const inscription = await this.prisma.inscription.findUnique({
            where: { id },
        });
        if (!inscription) {
            throw new common_1.NotFoundException('Inscription introuvable');
        }
        return this.prisma.inscription.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
    }
};
exports.InscriptionsService = InscriptionsService;
exports.InscriptionsService = InscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InscriptionsService);
//# sourceMappingURL=inscriptions.service.js.map