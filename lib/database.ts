import { AttributeType, BillingMode, Table, ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export class SwnDatabase extends Construct {

    public readonly productTable: ITable;
    public readonly basketTable: ITable;
    public readonly orderTable: ITable;

    constructor(scope: Construct, id: string){
        super(scope, id);
        this.basketTable = this.createBasketTable();
        this.productTable = this.createProductTable();
        this.orderTable = this.createOrderTable();
    }

    private createProductTable(): ITable {
        return new Table(this, 'product', {
            partitionKey: {
              name: 'id',
              type: AttributeType.STRING
            },
            tableName: 'product',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
          });
    }

    private createBasketTable(): ITable {
        return new Table(this, 'basket', {
            partitionKey: {
              name: 'userName',
              type: AttributeType.STRING
            },
            tableName: 'basket',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
        });
    }

    private createOrderTable(): ITable {
      return new Table(this, 'order', {
        partitionKey: {
          name: 'userName',
          type: AttributeType.STRING
        },
        sortKey: {
          name: 'orderDate',
          type: AttributeType.STRING
        },
        tableName: 'order',
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST
      })
    }
}