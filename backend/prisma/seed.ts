import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du seed...');

  // Hasher les mots de passe
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  const adminPassword: string = await bcrypt.hash('admin', 10);

  // Créer un admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {},
    create: {
      email: 'admin@mail.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin créé:', admin.email);

  // Formations
  await prisma.formation.upsert({
    where: { id: 'formation-1' },
    update: {},
    create: {
      id: 'formation-1',
      title: 'Conseiller de vente',
      description:
        'Le conseiller de vente exerce son activité dans un environnement commercial' +
        "omnicanal. Il assure la vente de produits et de services associés nécessitant l'apport" +
        "de conseils et de démonstrations auprès d'une clientèle de particuliers et parfois de" +
        'professionnels. II prend en compte l’ensemble du dispositif de commercialisation.',
      domaine: 'Commerce',
      duration: 10,
      content:
        'Modules : Contribuer à l’efficacité commerciale d’une unité' +
        'marchande dans un environnement omnicanal',
    },
  });

  await prisma.formation.upsert({
    where: { id: 'formation-2' },
    update: {},
    create: {
      id: 'formation-2',
      title: "Manager d'unité marchande",
      description:
        "Le manager développe la dynamique commerciale d’une unité marchande dans un environnement omnicanal (plusieurs canaux d'une même marque) et pilote l’offre produits." +
        'Il est au cœur de l’activité lié à la gestion économique et financière. Il est à la fois le' +
        'garant du pilotage de la performance',
      domaine: 'Commerce',
      duration: 18,
      content:
        "Modules : Développer la dynamique commerciale de l'unité marchande dans un environnement omnicanal",
    },
  });

  await prisma.formation.upsert({
    where: { id: 'formation-3' },
    update: {},
    create: {
      id: 'formation-3',
      title: 'Employé polyvalent en restauration',
      description:
        "L'employé polyvalent en restauration contribue à la satisfaction de la clientèle et à la réputation de l'établissement." +
        'Il réalise des productions culinaires simples, les dresse avec goût et les distribue avec un accueil adapté aux clients.',
      domaine: 'Restauration',
      duration: 12,
      content:
        'Modules : Préparer et dresser des entrées et des desserts. Accueillir, conseiller et servir la clientèle.',
    },
  });

  await prisma.formation.upsert({
    where: { id: 'formation-4' },
    update: {},
    create: {
      id: 'formation-4',
      title: 'Boulanger',
      description:
        'Le boulanger réalise quotidiennement des pains, viennoiseries et produits de snacking dans le respect des règles d’hygiène et de sécurité.' +
        'Il maîtrise les techniques de pétrissage, de fermentation, de façonnage et de cuisson pour proposer des produits de qualité artisanale.',
      domaine: 'Restauration',
      duration: 12,
      content:
        'Modules : Techniques de panification, gestion des fermentations, façonnage, cuisson, hygiène et sécurité alimentaire.',
    },
  });

  await prisma.formation.upsert({
    where: { id: 'formation-5' },
    update: {},
    create: {
      id: 'formation-5',
      title: 'Pâtissier',
      description:
        'Le pâtissier prépare des entremets, tartes, gâteaux et desserts variés en maîtrisant les techniques de base et avancées de la pâtisserie.' +
        'Il travaille avec précision pour réaliser des produits esthétiques et savoureux, tout en respectant les règles d’hygiène.',
      domaine: 'Restauration',
      duration: 14,
      content:
        'Modules : Crèmes et appareils, pâtes de base, entremets, chocolat, décoration, hygiène et sécurité.',
    },
  });

  console.log('Seed terminé avec succès');
}

main()
  .catch((e) => {
    console.error('Erreur seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
