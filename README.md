# AWS CDK Serverless Microservice
> WIP
This is a sample of an ecommerce backend microservices built with the [AWS CDK](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-construct-library.html) using AWS Serverless Services.
![ALT Text](./images/event-driven-microsrvices-image.png)

## AWS Services
- AWS API Gateway
- AWS Lambda
- AWS DynamoDB
- AWS SQS
- AWS Eventbridge

## Ecommerce Microservices
1. Product Service
2. Basket Service
3. Ordering Service

## Required Software
1. Node.js
2. AWS Account
3. AWS CLI
4. AWS CDK
5. Docker

## Getting Started
1. Clone the repository
2. At the root directory which include cdk.json files, run below command:
```
cdk deploy
```
> Make sure Docker is running
4. Once all microservices are deployed you can test each service by hitting the following endpoints:

    1. Product API -> [https://xxx.execute-api.ap-southeast-1.amazonaws.com/prod/product]()
    2. Basket API -> [https://xxx.execute-api.ap-southeast-1.amazonaws.com/prod/basket]()
    3. Ordering API -> [https://xxx.execute-api.ap-southeast-1.amazonaws.com/prod/order]()


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
