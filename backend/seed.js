const prisma = require('./src/config/prisma');

async function seed() {
  try {
    const user = await prisma.users.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        password_hash: 'hashedpassword',
        role: 'user'
      }
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
