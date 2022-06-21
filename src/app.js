import express from 'express'
import { env } from './env.js'
import * as Api from './api/router.js'
import * as mysql from './lib/mysql.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(Api.path, Api.router);

const port = env.port || 3000

app.listen(port, async function () {
	await mysql.connect();
	console.log('Express server has started on port ' + port);
});
