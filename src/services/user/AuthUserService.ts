import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from 'jsonwebtoken';

type AuthRequest = {
    email: string,
    senha: string
}

class AuthUserService {
    async execute({ email, senha }: AuthRequest) {

        const user = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error('Usuário ou senha incorretos!');
        }

        if (!await compare(senha, user.senha)) {
            throw new Error('Usuário ou senha incorretos!');
        }

        const token = sign(
            {
                nome: user.nome,
                usuario: user.email
            },
            process.env.JWT_SECRET!,
            {
                subject: user.id,
                expiresIn: '30d'
            })

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };
