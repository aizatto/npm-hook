import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import * as MailgunCore from 'mailgun-js';
import * as crypto from 'crypto';

const mailgun = new MailgunCore({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

interface NpmHookPublish {
  event: string
  name: string
  version: string
  payload: {
    readme: string,
  }
  change: {
    "dist-tag": string
    version: string
  }
}

export const hook: APIGatewayProxyHandler = async (event, _context) => {
  const body: NpmHookPublish = JSON.parse(event.body);
  const name = body.name;
  const version = body.change.version;

  const expectedSignature = event.headers['X-NPM-SIGNATURE'];
  const actualSignature = crypto
    .createHmac('sha256', process.env.SECRET)
    .update(event.body)
    .digest('hex');

  if (expectedSignature !== 'sha256=' + actualSignature) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'invalid payload signature found in x-npm-signature header',
        input: event,
      }, null, 2),
    };
  }

  var attachment = new mailgun.Attachment({
    data: Buffer.from(JSON.stringify(body, null, 2), 'utf8'),
    filename: `${name} ${version}.json`,
    contentType: 'application/json',
  });

  const result = await mailgun.messages().send({
    from: process.env.FROM,
    to: process.env.TO,
    subject: `Package Update: ${name}@${version}`,
    text: `https://www.npmjs.com/package/${name}\n\n${body.payload.readme}`,
    'o:tracking': false,
    attachment,
  });

  console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}
