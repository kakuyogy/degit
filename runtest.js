const degit = require('./dist');
const tar = require('tar');

const giturl = 'git@gitlab.alibaba-inc.com:sula-materials/test';
const httpsurl = 'https://gitlab.alibaba-inc.com/sula-materials/test'
const bigfishUrl = 'https://gitlab.alibaba-inc.com/bigfish-blocks/tech-ui';
const bigfishSubdir = 'https://gitlab.alibaba-inc.com/bigfish-blocks/tech-ui/templates/Labels'
const okSuburl = 'Rich-Harris/degit-test-repo/subdir';
const riskTemplates = 'https://gitlab.alibaba-inc.com/bigfish-blocks/risk-templates';
const riskTemplatesSubdir = 'https://gitlab.alibaba-inc.com/bigfish-blocks/risk-templates/config';
const emitter = degit(riskTemplatesSubdir, {
	cache: false,
	force: true,
  verbose: true,
});

emitter.on('info', info => {
	console.log(info.message);
});

emitter.clone('.tmp/test-repo').then((destpath) => {
  console.log('destpath: ', destpath);
	console.log('done');
}).catch((err) => {
  console.log('err: ', err);
});

emitter.clone('.tmp/xxx', true).then((destpath) => {
  console.log('destpath: ', destpath);

})

// const subdir = 'tech-ui-master/templates';
// const dist = './dest';

// tar.extract(
//   {
//     file: './master.tar.gz',
//     strip: subdir ? subdir.split('/').length : 1,
//     C: dist
//   },
//   // ['templates'],
// );