import serverlessHandler from '@codegenie/serverless-express';
import app from './app';

export const handler = serverlessHandler({ app });
