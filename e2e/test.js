
exports.config = {
    directConnect: true,
    capablities: {
        'browserName': 'chorme'
    },
    framework: 'jasmine',
    specs: [
        'src/app/example/example.ts'
    ],
    seleniumAddress: 'http://localhost:4200/home',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};