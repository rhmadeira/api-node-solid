import { prisma } from "@/lib/prisma";
import { PrismaUserRepository } from "@/repositories/prisma-users-repository";
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

  const prismaUserRepository = new PrismaUserRepository();

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  });
}
