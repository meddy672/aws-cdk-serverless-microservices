import { Construct } from 'constructs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

interface SwnApiGatewayProps {
    productMicroservice: IFunction,
    basketMicroservice: IFunction,
    orderNMicroservice: IFunction
};

export class SwnApiGateway extends Construct {

    constructor(scope: Construct, id: string, props: SwnApiGatewayProps) {
        super(scope, id);
        this.createProductApi(props.productMicroservice);
        this.createBasketApi(props.basketMicroservice);
        this.createOrderApi(props.orderNMicroservice);
    }

    private createProductApi(productMicroservice: IFunction) {

        const apigw  = new LambdaRestApi(this, 'ProductApi', {
            restApiName: 'Product Service',
            handler: productMicroservice,
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

    private createBasketApi(basketMicroservice: IFunction) {

        const apigw = new LambdaRestApi(this, 'BasketApi', {
            restApiName: 'Basket Service',
            handler: basketMicroservice,
            proxy: false
        });

        const basket = apigw.root.addResource('basket');
        basket.addMethod('GET'); // GET /basket
        basket.addMethod('POST'); // POST /basket

        const singleBasket = basket.addResource('{userName}');
        singleBasket.addMethod('GET');
        singleBasket.addMethod('DELETE');

        const basketCheckout = basket.addResource('checkout');
        basketCheckout.addMethod('POST');
    }

    private createOrderApi(orderMicroservice: IFunction) {

        const apigw = new LambdaRestApi(this, 'OrderApi', {
            restApiName: 'Order Service',
            handler: orderMicroservice,
            proxy: false
        });

        const order = apigw.root.addResource('order');
        order.addMethod('GET'); // GET /order

        const singleOrder = order.addResource('{userName}');
        singleOrder.addMethod('GET'); // GET /order/{userName}

        return singleOrder;
    }
}