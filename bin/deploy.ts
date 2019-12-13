#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ContactUSStack } from '../lib/contact-us-stack';

const applicationName = 'serverless-contact-us';
const stackName = applicationName.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s/g,'');

const app = new cdk.App();
new ContactUSStack(app, stackName, {
  tags: {
    name: 'some-tags'
  }
});
