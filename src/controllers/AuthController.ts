import { Request, Response } from "express";
import AuthService from "../service/AuthService";

export default new (class AuthController {
    async register(req: Request, res: Response) {
        try {
            const response = await AuthService.register(req, res);
            return res.status(201).json(response);
        } catch (error: any) {
            const status = error.status || 500;  // Default to 500 if status is undefined
            res.status(status).json({ message: error.message || 'Internal Server Error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const response = await AuthService.login(req, res);
            return res.status(200).json(response);
        } catch (error: any) {
            const status = error.status || 500;  // Default to 500 if status is undefined
            res.status(status).json({ message: error.message || 'Internal Server Error' });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            return res.status(200).json({ message: "Logout Success!" });
        } catch (error: any) {
            const status = error.status || 500;  // Default to 500 if status is undefined
            res.status(status).json({ message: error.message || 'Internal Server Error' });
        }
    }
})();
