import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { loginSchema, registerSchema } from "../utils/validator/authValidator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import ResponseError from "../error/responseError";

export default new (class AuthService {
    private readonly authrepository: Repository<User> = AppDataSource.getRepository(User);

    async register(req: Request, res: Response) {
        try {
            const { error, value } = registerSchema.validate(req.body);
            if (error) throw new ResponseError(400, error.details[0].message);

            const userCheck = await this.authrepository.countBy({ username: value.username });
            if (userCheck > 0) throw new ResponseError(400, "Username already exist!");

            const hash = await bcrypt.hash(value.password, 10);
            await this.authrepository.save({
                username: value.username,
                password: hash,
                picture: `https://i.pravatar.cc/300?u=${value.username}`,
                cover_photo: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922127.jpg?w=1380&t=st=1708582592~exp=1708583192~hmac=f37536809572c900ab36010f54a57832a5c9dfd9cc91d8da1d20754d52ed3ee0",
                name: value.fullname,
            });

            const get = await this.authrepository.findOne({ where: { username: value.username } });

            const token = jwt.sign({ id: get?.id, username: get?.username }, process.env.SECRET_KEY!, { expiresIn: "7d" });

            return {
                message: "Account created successfully",
                user: {
                    id: get?.id,
                    username: get?.username,
                },
                token: token,
            };
        } catch (error: any) {
            throw new ResponseError(500, error.message || "Something went wrong during registration");
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) throw new ResponseError(400, error.details[0].message);

            const userCheck = await this.authrepository.findOne({
                where: { username: value.username },
                select: { id: true, username: true, password: true }
            });
            if (!userCheck) throw new ResponseError(401, "Username not registered yet!");

            const isEqual = await bcrypt.compare(value.password, userCheck.password);
            if (!isEqual) throw new ResponseError(401, "Username or Password is not correct!");

            const token = jwt.sign({ id: userCheck.id, username: userCheck.username }, process.env.SECRET_KEY!, { expiresIn: "7d" });

            return {
                message: "Login success",
                user: {
                    id: userCheck.id,
                    username: userCheck.username,
                },
                token: token,
            };
        } catch (error: any) {
            throw new ResponseError(500, error.message || "Something went wrong during login");
        }
    }
})();

