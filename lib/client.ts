import { Client } from 'faunadb'
//import { query } from 'faunadb-fql-lib'

const faunaEnv = process.env.FAUNA_SECRET ?? process.env.FAUNA_SERVER_SECRET ?? "" 

const client = (secret?:string) => {
	return new Client({
		secret:secret ?? faunaEnv
	})
}

export default client