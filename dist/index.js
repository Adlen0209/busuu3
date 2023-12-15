import express from 'express';
import "dotenv/config";
import { router } from './app/routes/index.js';
const app = express();
import helmet from "helmet";
app.use(helmet());
import debug from 'debug';
const logger = debug('EntryPoint');
const port = process.env.PORT ?? 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.set('trust proxy', 1);
import session from 'express-session';
app.use(session({
    saveUninitialized: false,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 1000),
    },
}));
app.use(router);
app.listen(port, () => {
    console.log(`server run on port ${port}`);
});
//# sourceMappingURL=index.js.map