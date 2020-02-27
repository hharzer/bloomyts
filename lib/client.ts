import { Client, ClientConfig } from 'faunadb';
import { isEmpty } from "lodash";
const faunaEnv = process.env.FAUNA_SECRET ?? process.env.FAUNA_SERVER_SECRET ?? '';

const client = (init?: ClientConfig | string) => {
	if (init === null || isEmpty(init)) {
		return new Client({
			secret: faunaEnv
		})
	} else if (typeof init === "string") {
		return new Client({
			secret: init
		});
	} else {
		return new Client(init)
	}
};

export default client;
