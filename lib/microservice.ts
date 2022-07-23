import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { ITable } from "aws-cdk-lib/aws-dynamodb";

interface SwnMicroservicesProps {
    productTable: ITable,
    basketTable: ITable,
    orderTable: ITable
}

export class SwnMicroservices extends Construct {

    public readonly productMicroservice: NodejsFunction;
    public readonly basketMicroservice: NodejsFunction;
    public readonly orderMicroservice: NodejsFunction;

    constructor(scope: Construct, id: string, props: SwnMicroservicesProps) {
        super(scope, id);
        this.productMicroservice = this.createProductFunction(props.productTable);
        this.basketMicroservice = this.createBasketFunction(props.basketTable);
        this.orderMicroservice = this.createOderingFunction(props.orderTable)
    }

    private createProductFunction(productTable: ITable): NodejsFunction {

        const productFunctionProps: NodejsFunctionProps = {
            bundling: {
              externalModules: [
                'aws-sdk'
              ],
              minify: true
            },
            environment: {
              PRIMARY_KEY: 'id',
              DYNAMODB_TABLE_NAME: productTable.tableName
            },
            runtime: Runtime.NODEJS_14_X
          }
      
          const productFunction = new NodejsFunction(this, 'productLambdaFunction', {
            entry: join(__dirname, `/../src/product/index.js`),
            ...productFunctionProps
          });
      
          productTable.grantReadWriteData(productFunction);

          return productFunction;
    }

    private createBasketFunction(basketTable: ITable): NodejsFunction {

        const basketFunctionProps: NodejsFunctionProps =  {
            bundling: {
                externalModules: [
                    'aws-sdk'
                ],
                minify: true
            },
            environment: {
                PRIMARY_KEY: 'userName',
                DYNAMODB_TABLE_NAME: basketTable.tableName
            },
            runtime: Runtime.NODEJS_14_X
        };

        const basketFunction = new NodejsFunction(this, 'basketLambdaFunction', {
            entry: join(__dirname, `/../src/basket/index.js`),
            ...basketFunctionProps
        });

        basketTable.grantReadWriteData(basketFunction);

        return basketFunction;
    }

    private createOderingFunction(orderTable: ITable): NodejsFunction {
        
        const orderingFunctionProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk'
                ],
                minify: true
            },
            environment: {
                PRIMARY_KEY: 'userName',
                SORT_KEY: 'orderDate',
                DYNAMODB_TABLE_NAME: orderTable.tableName
            },
            runtime: Runtime.NODEJS_14_X
        };

        const orderFunctiuon = new NodejsFunction(this, 'orderingLambdaFunction', {
            entry: join(__dirname, `/../src/ordering/index.js`),
            ...orderingFunctionProps
        });

        orderTable.grantReadWriteData(orderFunctiuon);

        return orderFunctiuon
    }
}