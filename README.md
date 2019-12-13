# Serverless contact us form

This is sample project for serverless contact us form. It uses AWS CDK for deployment.

## List of AWS resources

1. API Gateway
2. Lambda
3. SNS

## Setup

1. ```git clone https://github.com/rahulrkr08/aws-sls-cdk-contact-us-form.git```

2. Change your email ID in ```./lib/contact-us-stack.ts```

3. Deploy your stack using AWS CDK ```cdk deploy```

4. Confirm SNS email verification

5. ```curl -x POST -d '{ "message": { "Name": "Customer name", "Email": "email@email.com", "Subject": "sample subject", "Message": "sample message"}}' https://<api gateway id>.execute-api.<region>.amazonaws.com/prod/contactus```

## Useful CDK commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
