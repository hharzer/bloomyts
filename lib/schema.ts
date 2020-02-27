import AJV, { ValidateFunction, ValidationError } from 'ajv'
//@ts-ignore
import shorthand from 'json-schema-shorthand'

export function makeModel(schema = {}, { convenience = true } = {}) {
	const convertedSchema = convenience ? shorthand.object(schema) : schema;
	if (process.env.NODE_ENV !== "production") {
		console.log(convertedSchema);
	}
	const model = new AJV();
	//ajvSanitizer(model);
	return model.compile(convertedSchema);
}

export { ValidateFunction }