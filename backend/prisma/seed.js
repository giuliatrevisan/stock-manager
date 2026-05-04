import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Administrador";

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL e ADMIN_PASSWORD devem estar definidos no .env");
  }

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