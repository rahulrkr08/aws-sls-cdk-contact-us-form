import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');
import sns = require('@aws-cdk/aws-sns');
import subs = require('@aws-cdk/aws-sns-subscriptions');
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { ApiKeySourceType } from '@aws-cdk/aws-apigateway';

export class ContactUSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const email = '<email goes here>';
    const subject = 'contact us';
    

    const topic = new sns.Topic(this, `ContactUsSNSTopic`, {
      displayName: subject
    });

    topic.addSubscription(new subs.EmailSubscription(email));

    const lambdaSNSPolicyStatement = new PolicyStatement({
      resources: [topic.topicArn],
      actions: ['sns:Publish'] 
    })

    const contactUsForm = new lambda.Function(this, `ContactUsLambda`, {
      code: new lambda.AssetCode('src'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      initialPolicy: [
        lambdaSNSPolicyStatement
      ],
      environment: {
        Subject: subject,
        ContactUsSNSTopic: topic.topicArn
      }
    });

    const api = new apigateway.RestApi(this, `ContactUsAPIGateway`, {
      restApiName: `${id}ContactUsRestAPI`
    });

    const contactus = api.root.addResource('contactus');
    const contactUsAPIIntegration = new apigateway.LambdaIntegration(contactUsForm);
    contactus.addMethod('POST', contactUsAPIIntegration);
    addCorsOptions(contactus);

    const plan = api.addUsagePlan(`${id}ContactUs`, {
      name: `${id}UsagePlan`
    });
    
    plan.addApiStage({
      stage: api.deploymentStage
    });
  }
}


export function addCorsOptions(apiResource: apigateway.IResource) {
  apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS, POST'",
      },
    }],
    passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': false,
        'method.response.header.Access-Control-Allow-Origin': true,
      },  
    }]
  })
}