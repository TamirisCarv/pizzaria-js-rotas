declare namespace Express {
    export interface Request extends Express.Request {
        user_id: string
    }
}