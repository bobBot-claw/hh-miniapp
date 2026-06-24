const path = require('path');
const fs = require('fs');
const ci = require('miniprogram-ci');

async function main() {
  const appid = process.env.WX_APPID;
  const privateKeyPath =
    process.env.WX_PRIVATE_KEY_PATH || path.resolve(__dirname, '../private.key');
  if (!appid) throw new Error('缺少环境变量 WX_APPID');
  if (!fs.existsSync(privateKeyPath)) throw new Error('找不到上传密钥文件: ' + privateKeyPath);

  const projectPath = path.resolve(__dirname, '../client');
  const project = new ci.Project({
    appid, type: 'miniProgram', projectPath, privateKeyPath,
    ignores: ['node_modules/**/*'],
  });

  const version = process.env.WX_VERSION || '1.0.0';
  const desc = (process.env.WX_DESC && process.env.WX_DESC.trim()) || 'CI 自动上传';
  const robot = Number(process.env.WX_ROBOT || 1);

  console.log('开始上传 appid=' + appid + ' version=' + version + ' robot=' + robot);
  const result = await ci.upload({
    project, version, desc,
    setting: { es6: true, es7: true, minify: true, minifyJS: true, minifyWXML: true, minifyWXSS: true, autoPrefixWXSS: true },
    robot,
    onProgressUpdate: (info) => { if (typeof info === 'string') console.log(info); },
  });
  console.log('✅ 上传成功');
  try { console.log(JSON.stringify(result, null, 2)); } catch (e) { console.log(result); }
}
main().catch((err) => { console.error('❌ 上传失败：', err && err.message ? err.message : err); process.exit(1); });
