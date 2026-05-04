import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@system.com";
  const password = process.env.ADMIN_PASSWORD || "123456";
  const name = process.env.ADMIN_NAME || "Administrador do Sistema";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      role: "admin",
      name,
      phone: "(91) 99999-9999",
      position: "CEO",
      department: "TI",
      isActive: true,
    },
    create: {
      email,
      password: hashedPassword,
      role: "admin",
      name,
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
  });