https://docs.npmjs.com/cli/hook.html
https://github.com/npm/npm-hook-receiver
https://github.com/bojand/mailgun-js

Test locally:
```fish
sls offline start --stage dev
```

Deploy:

```fish
sls deploy --region ap-southeast-1 --stage prod
```

```fish
set -x HOOK_URL https://8ljkjasdf8.execute-api.ap-southeast-1.amazonaws.com/prod/
set -x HOOK_SECRET 08AEEEF6-F256-41BD-83C6-E7EE2928925F
npm hook add @aizatto $HOOK_URL $HOOK_SECRET
npm hook add @hapi $HOOK_URL $HOOK_SECRET
npm hook add aws-sdk $HOOK_URL $HOOK_SECRET
npm hook add bootstrap $HOOK_URL $HOOK_SECRET
npm hook add create-react-app $HOOK_URL $HOOK_SECRET
npm hook add date-fns $HOOK_URL $HOOK_SECRET
npm hook add graphql $HOOK_URL $HOOK_SECRET
npm hook add graphql-relay $HOOK_URL $HOOK_SECRET
npm hook add knex $HOOK_URL $HOOK_SECRET
npm hook add lerna $HOOK_URL $HOOK_SECRET
npm hook add moment $HOOK_URL $HOOK_SECRET
npm hook add react $HOOK_URL $HOOK_SECRET
npm hook add react-router-dom $HOOK_URL $HOOK_SECRET
npm hook add reactstrap $HOOK_URL $HOOK_SECRET
npm hook add relay-compiler $HOOK_URL $HOOK_SECRET
npm hook add relay-runtime $HOOK_URL $HOOK_SECRET
npm hook add typescript $HOOK_URL $HOOK_SECRET
npm hook add yarn $HOOK_URL $HOOK_SECRET
npm hook ls
```

```
curl -X POST $HOOK_URL
```

Bump a package for testing:
```
npm version patch && npm publish --access public && npm hook ls
```