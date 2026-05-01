import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@system.com";
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin padrão criado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });