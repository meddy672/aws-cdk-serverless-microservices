import { AttributeType, BillingMode, Table, ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export class SwnDatabase extends Construct {

    public readonly productTable: ITable;

    constructor(scope: Construct, id: string){
        super(scope, id);

        const productTable = new Table(this, 'product', {
            partitionKey: {
              name: 'id',
              type: AttributeType.STRING
            },
            tableName: 'product',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
          });

          this.productTable = productTable;
    }
}