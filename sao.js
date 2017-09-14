const _ = require('lodash');
const pkg = require('./package.json');
const {mv} = require('shelljs');

module.exports = {
  templateOptions: {
    context: {
      kebabCase: _.kebabCase,
      startCase: _.startCase,
      camelCase: _.camelCase,
      upCase: function(x) { return _.startCase(x).replace(/ /g, '') },
      templateVersion: pkg.version,
    }
  },
  prompts: {
    name: {
      message: 'Name of your module?',
      default: ':folderName:',
    },
    category: {
      message: 'Category of your module?',
      default: 'Other',
    },
    description: {
      message: 'Provide a short description',
      default: 'An awesome BITS module',
    },
    bitsVersion: {
      message: 'What BITS version are you targeting?',
      default: '2.4.0',
    },
    generateMessageCenter: {
      type: 'confirm',
      message: 'Should example MessageCenter code be generated?',
      default: true
    }
  },
  filters: {
  },
  move(answers) {
    return {
      'gitignore': '.gitignore',
      'app/elements/module/app.html': `app/elements/module/${_.kebabCase(answers.name)}-app.html`,
    }
  },
  installDependencies: true,
  gitInit: true,
  post({ answers, log }) {
    mv('app/elements/module', `app/elements/${_.kebabCase(answers.name)}`);
    log.success('Your module has been created');
  },
};
