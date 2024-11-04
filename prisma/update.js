const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

prisma.user
    .upsert({
        where: { id: 1 },
        update: { name: "Bobby" },
        create: { name: "Bobby", bio: "Bobby's bio" },
    })
    .then(data => console.log(data))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });