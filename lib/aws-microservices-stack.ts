import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { SwnDatabase } from './database';
import { SwnMicroservices } from './microservice';


export class AwsMicroservicesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const database = new SwnDatabase(this, 'Database');

    const microservices = new SwnMicroservices(this, 'Microservices', {
      productTable: database.productTable
    })

    const apigw  = new LambdaRestApi(this, 'productApi', {
      restApiName: 'Product Service',
      handler: microservices.productMicroservice,
      proxy: false
    });

    const product = apigw.root.addResource('product'); // Represents the root resource
    product.addMethod('GET'); // GET /product/
    product.addMethod('POST'); // POST /product/

    const singleProduct = product.addResource('{id}');
    singleProduct.addMethod('GET'); // GET /product/{id}
    singleProduct.addMethod('PUT'); // PUT /product/{id}
    singleProduct.addMethod('DELETE'); // DELETE /product/{id}

  }
}
