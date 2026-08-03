import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { BaseService } from "./base.service";
import { UsuarioDAO } from "../dao/usuario.dao";
import { Usuario } from "../models/Usuario";
import { HttpError } from "../utils/httpError";


@injectable()
export class UsuarioService extends BaseService<Usuario> {


    constructor(
        @inject(UsuarioDAO)
        private usuarioDAO: UsuarioDAO
    ){

        super(
            usuarioDAO,
            "Usuário"
        );

    }



    async findSafe(options?: any){

        const result =
            await this.dao.find(options);


        return {

            ...result,

            data: result.data.map(usuario=>{

                const {
                    SENHA_HASH,
                    ...rest
                } = usuario;


                return rest;

            })

        };

    }




    async findSafeById(id:number){

        const usuario =
            await this.findById(id);


        const {
            SENHA_HASH,
            ...rest
        } = usuario;


        return rest;

    }




    async insert(usuario: Omit<Usuario,"ID">){


        const existe =
            await this.usuarioDAO.findByLogin(
                usuario.LOGIN
            );


        if(existe){

            throw new HttpError(
                409,
                "Login já cadastrado."
            );

        }


        const senhaHash =
            await bcrypt.hash(
                usuario.SENHA_HASH,
                10
            );


        return super.insert({

            LOGIN: usuario.LOGIN,

            NOME: usuario.NOME,

            SENHA_HASH: senhaHash,

            ATIVO:"S"

        });

    }




    async login(
        login:string,
        senha:string
    ){


        const usuario =
            await this.usuarioDAO.findByLogin(
                login
            );


        if(!usuario){

            throw new HttpError(
                401,
                "Login ou senha inválidos."
            );

        }


        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.SENHA_HASH
            );


        if(!senhaValida){

            throw new HttpError(
                401,
                "Login ou senha inválidos."
            );

        }


        const token =
            jwt.sign(

                {
                    id:usuario.ID,
                    login:usuario.LOGIN
                },

                process.env.JWT_SECRET!,

                {
                    expiresIn:"7d"
                }

            );


        return {

            token,

            usuario:{

                ID:usuario.ID,

                LOGIN:usuario.LOGIN,

                NOME:usuario.NOME

            }

        };

    }

}