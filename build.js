var metalsmith = require('metalsmith')
var inPlace = require('metalsmith-in-place');


metalsmith(__dirname)
    .metadata({
        site: {
            name: 'Andy.To',
            description: 'Andy To\'s blog of random things'
        }
    })
    .source('src')
    .destination('build')
    .use(inPlace({
            engine: 'nunjucks',
            engineOptions: {
              path: __dirname + '/src'
            }
        }))
    .build(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Website Built!')
        }
    })
