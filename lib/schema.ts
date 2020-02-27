import AJV, { ValidateFunction } from 'ajv';
// @ts-ignore
import shorthand from 'json-schema-shorthand';

export function makeModel(schema = {}, { convenience = true } = {}) {
  const convertedSchema = convenience ? shorthand.object(schema) : schema;
  const model = new AJV();
  return model.compile(convertedSchema);
}

export { ValidateFunction };
