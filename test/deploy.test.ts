import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Deploy = require('../lib/contact-us-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Deploy.DeployStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});