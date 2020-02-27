import AJV, { ValidateFunction } from 'ajv';
import FaunaDb, { ExprArg, Expr } from 'faunadb';
export declare type RefType = FaunaDb.values.Ref;
export declare type Document = FaunaDb.values.Document;
export declare type Page = FaunaDb.values.Page<Document>;
export interface IModelConfig {
    convenience?: boolean;
    noSchema?: boolean;
    allLowercase?: boolean;
    indexed_by?: Array<string>;
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
        errors: AJV.ErrorObject[] | null | undefined;
    }>;
    create(data: object): Promise<{
        valid: {
            valid: boolean | PromiseLike<any>;
            errors: AJV.ErrorObject[] | null | undefined;
        };
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
declare function init(secret?: string): {
    Model: typeof Model;
};
export default init;
//# sourceMappingURL=collection.d.ts.map