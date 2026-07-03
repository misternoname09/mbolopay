const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const phone1 = '+221781210104';
  const phone2 = '781210104';
  
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { phone: phone1 },
        { phone: phone2 }
      ]
    }
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' }
    });
    console.log(`Updated user ${user.id} to ADMIN`);
  } else {
    console.log(`User not found with phone ${phone1} or ${phone2}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
