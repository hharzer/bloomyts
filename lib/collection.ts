import createClient from './client';
import { makeModel, ValidateFunction } from './schema';
import _ from 'lodash';
import FaunaDb, { ClientConfig, ExprArg, Expr, Client } from 'faunadb';
import { query } from 'faunadb-fql-lib';

const {
	IsRef,
	Ref,
	Create,
	Documents,
	GetAll,
	Get,
	Collection,
	Match,
	Index,
	Delete,
	If,
	IsIndex,
	Abort,
	Paginate,
	Update,
} = query;

export type RefType = FaunaDb.values.Ref;

export type Document = FaunaDb.values.Document;
export type Page = FaunaDb.values.Page<Document>;
let client: Client;

export interface IModelConfig {
	convenience?: boolean;
	noSchema?: boolean;
	allLowercase?: boolean;
	indexed_by?: string[];
	maskedFields?: string[]
}

const modelConfig: IModelConfig = {
	convenience: true,
	noSchema: false,
	allLowercase: true,
	indexed_by: [],
	maskedFields: []
};

export interface IModelOptions {
	collectionName: string;
	config?: IModelConfig;
	schema?: object;
}


class Model {
	collection: string = '';
	conf: IModelConfig = {};
	model: ValidateFunction;

	constructor({ collectionName, config = {}, schema = {} }: IModelOptions) {
		this.collection = collectionName;
		this.conf = _.merge(modelConfig, config);
		this.model = makeModel(schema, config);
	}

	indexes(index: string) {
		return `${this.collection}_by_${index}`;
	}

	withId({ data, ref: { id } }: Document) {
		if (_.isEmpty(this.conf.maskedFields)) {
			return { id, ...data };
		} else {
			return { id, ..._.omit(data, this.conf.maskedFields!) }
		}
	}

	async toRef(id: ExprArg) {
		return Ref(Collection(this.collection), id);
	}
	async test(data: object) {
		const valid = this.model(data);
		return { valid, errors: this.model.errors };
	}

	async create(data: object) {

		if (!this.conf.noSchema) {
			const valid = await this.test(data);
			if (!valid) {
				return valid;
			}
		}
		return this.withId(await client.query(Create(Collection(this.collection), { data })));
	}

	async list() {
		const result: Page = await client.query(GetAll(Paginate(Documents(Collection(this.collection)))));

		return result.data.map(res => {
			return this.withId(res);
		});
	}

	async find(id: Expr) {
		const ref = await this.toRef(id);
		return this.withId(await client.query(If(IsRef(ref), Get(ref), Abort(`${id} does not exist`))));
	}

	async findBy(index: string, criterion: Expr) {
		const result: Page = await client.query(
			If(
				IsIndex(Index(this.indexes(index))),
				GetAll(Match(Index(this.indexes(index)), criterion)),
				Abort(`Not an index:${index} -> ${this.indexes(index)}`),
			),
		);
		return result.data.map(res => this.withId(res));
	}

	async findOneBy(index: string, criterion: Expr) {
		const res = await this.findBy(index, criterion);
		return _.head(res);
	}

	async remove(id: Expr) {
		const ref = this.toRef(id);
		return this.withId(await client.query(If(IsRef(ref), Delete(ref), Abort(`Not a id: ${id}`))));
	}

	async update(id: Expr, data: object) {
		const ref = this.toRef(id);
		return this.withId(await client.query(If(IsRef(ref), Update(ref, { data }), Abort(`Not a ref ${id} -> ${ref}`))));
	}
}

export type FaunaInit = string | Client

function create(init: FaunaInit = ""): { Model: typeof Model } {

	if (typeof init === "string") {
		client = createClient(init);
	} else {
		client = init
	}
	return {
		Model,
	};
}



export default create;
