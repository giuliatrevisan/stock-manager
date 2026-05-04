import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const email = "admin@system.com";
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      role: "admin",
      name: "Administrador do Sistema",
      phone: "(91) 99999-9999",
      position: "CEO",
      department: "TI",
      isActive: true,
    },
    create: {
      email,
      password: hashedPassword,
      role: "admin",
      name: "Administrador do Sistema",
      phone: "(91) 99999-9999",
      position: "CEO",
      department: "TI",
      avatarUrl: null,
      isActive: true,
    },
  });

  console.log("Admin padrão criado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });d