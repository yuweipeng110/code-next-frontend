const { generateService } = require("@umijs/openapi");
/**
 * operationId format example: `@Controller('dataset') => DatasetController_${FunctionName}`
 */
const re = /.+?controller[-_ .](\w)/gi;

generateService({
    requestLibPath: "import request from '@/libs/request'",
    schemaPath: "http://localhost:8101/api/v2/api-docs",
    serversPath: "./src",
    // dataFields: ['code', 'data', 'message', 'success'],
    // requestOptionsType: 'Record<string, any>',
    hook: {
        customFunctionName(operationObject, apiPath) {
            console.log("operationObject", operationObject);
            console.log("apiPath", apiPath);
            const { operationId } = operationObject;

            if (!operationId) {
                console.warn('[Warning] no operationId', apiPath);
                return;
            }

            const funcName = operationId.replace(re, (_all: any, letter: any) => {
                const r = letter.toUpperCase();
                return r;
            });

            operationObject.operationId = funcName;
            console.log("funcName", funcName);
            return funcName;
        },
        // customType(schemaObject, namespace, defaultGetType) {
        //   const type = defaultGetType(schemaObject, namespace);

        //   console.log('params => ', schemaObject, namespace, type);
        //   // 提取出 data 的类型
        //   const regex = /API\.ResOp & \{ 'data'\?: (.+); \}/;
        //   const result = type.replace(regex, '$1');
        //   console.log('result => ', result);
        //   return result;
        // },
    },
});