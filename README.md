> WIP
# AWS CDK Serverless Microservice
This is a sample of an ecommerce backend RESTful microservices built with the [AWS CDK](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-construct-library.html) using AWS Serverless Services.
![ALT Text](./images/Screenshot%202022-07-23%20091133.png)

## AWS Services
- AWS API Gateway (client request)
- AWS Lambda (compute)
- AWS DynamoDB (storage)
- AWS SQS (integration)
- AWS Eventbridge (application integration)

## Overview
Within the `lib` directory the **aws-microservice-stack.ts** contains all the custom constructs to be provsioned on the AWS Platform.
1. **apigateway.ts** - provisions each api needed for each microservice
2. **databases.ts** - provisions each database for each microservice
3. **microservices.ts** - proviosns each lambda function needed for each service

Each service has its own **api gateway**, **lambda function** and **database**. The lambda functions can handle different http request sent by its respective api and process logic accordingly. The logic for each of the three lambda functions is stored in the `src` directory: *1. /basket*, *2. /ordering* *3. /product*. Each of the three directories have their own database client, i.e. `ddbClient.js` for database communication, and `package.json` file to install needed dependencies. In addition, the *basket* directory also contains an eventbridge client to send asynchronous request to the eventbridge. The basket microservice publishes events to the eventbridge and the ordering microservice subscribes to those events via an SQS Queue. The event received from the queue contains a payload with context of the basket and stores it as an order.


## Required Software
1. Node.js
2. AWS Account
3. AWS CLI
4. AWS CDK
5. Docker

## Getting Started
> Make sure you have installed all Required Software
1. Clone the repository
2. At the root directory which include cdk.json files, 
run below command:
> Make sure Docker is running
```sh
cdk synth # To synthesize into cloudformation template
```
next run the the command below:
```
cdk deploy
```
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
