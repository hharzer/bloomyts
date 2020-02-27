import { ValidateFunction } from './schema';
import FaunaDb, { ExprArg, Expr, Client } from 'faunadb';
export declare type RefType = FaunaDb.values.Ref;
export declare type Document = FaunaDb.values.Document;
export declare type Page = FaunaDb.values.Page<Document>;
export interface IModelConfig {
    convenience?: boolean;
    noSchema?: boolean;
    allLowercase?: boolean;
    indexed_by?: string[];
    maskedFields?: string[];
}
export interface IModelOptions {
    collectionName: string;
    config?: IModelConfig;
    schema?: object;
}
declare class Model {
    collection: string;
    conf: IModelConfig;
    model: ValidateFunction;
    constructor({ collectionName, config, schema }: IModelOptions);
    indexes(index: string): string;
    withId({ data, ref: { id } }: Document): {
        id: string;
    };
    toRef(id: ExprArg): Promise<FaunaDb.Expr>;
    test(data: object): Promise<{
        valid: boolean | PromiseLike<any>;
        errors: import("ajv").ErrorObject[] | null | undefined;
    }>;
    create(data: object): Promise<{
        id: string;
    }>;
    list(): Promise<{
        id: string;
    }[]>;
    find(id: Expr): Promise<{
        id: string;
    }>;
    findBy(index: string, criterion: Expr): Promise<{
        id: string;
    }[]>;
    findOneBy(index: string, criterion: Expr): Promise<{
        id: string;
    } | undefined>;
    remove(id: Expr): Promise<{
        id: string;
    }>;
    update(id: Expr, data: object): Promise<{
        id: string;
    }>;
}
export declare type FaunaInit = string | Client;
declare function create(init?: FaunaInit): {
    Model: typeof Model;
};
export default create;
//# sourceMappingURL=collection.d.ts.map