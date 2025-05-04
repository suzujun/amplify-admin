import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { invokeAdminAPI } from './lambda/resource';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  invokeAdminAPI,
});

backend.addOutput({
  custom: {
    invokeFunctionName: backend.invokeAdminAPI.resources.lambda.functionName,
  },
});

// Lambda function permissions
const cfStatement = new iam.PolicyStatement({
  actions: [
    "cloudformation:*"
  ],
  resources: ["*"]
});

backend.invokeAdminAPI.resources.lambda.addToRolePolicy(cfStatement);

//--------------------------------
// 以下、api gatewayの設定
//--------------------------------

// create a new API stack
const apiStack = backend.createStack("api-stack-nomal");

const api = new RestApi(apiStack, 'ExpressApiGateway', {
  restApiName: 'ExpressAPI',
  description: 'API Gateway to forward all requests to Lambda with Express',
  deployOptions: {
    stageName: 'dev',
  },
});

// create a new Lambda integration
const lambdaIntegration = new LambdaIntegration(
  backend.invokeAdminAPI.resources.lambda,
);

api.root.addMethod('ANY', lambdaIntegration);
api.root.addResource('{proxy+}').addMethod('ANY', lambdaIntegration);
