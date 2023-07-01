import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface ICreteUserProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({ name, email, password }: ICreteUserProps) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
  return;
}
