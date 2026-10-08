// Local OBS capture helper. Credentials stay in OBS's config and are never logged.
// Recording controls are also available through the OBS MCP hotkeys.
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const directory = resolve('tmp/showcase');
mkdirSync(directory, { recursive: true });
const statePath = join(directory, 'obs-state.json');
const config = JSON.parse(readFileSync(join(process.env.APPDATA, 'obs-studio/plugin_config/obs-websocket/config.json'), 'utf8'));
const socket = new WebSocket(`ws://127.0.0.1:${config.server_port}`);
const pending = new Map();
let identify;
const ready = new Promise((resolveReady, reject) => {
  identify = resolveReady;
  socket.addEventListener('error', () => reject(new Error('Cannot connect to local OBS')));
});
const hash = (value) => createHash('sha256').update(value).digest('base64');
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.op === 0) {
    const d = { rpcVersion: 1, eventSubscriptions: 0 };
    if (message.d.authentication) {
      const { salt, challenge } = message.d.authentication;
      d.authentication = hash(hash(config.server_password + salt) + challenge);
    }
    socket.send(JSON.stringify({ op: 1, d }));
  } else if (message.op === 2) identify();
  else if (message.op === 7) {
    const handler = pending.get(message.d.requestId);
    pending.delete(message.d.requestId);
    if (message.d.requestStatus.result) handler?.resolve(message.d.responseData ?? {});
    else handler?.reject(new Error(`${message.d.requestType}: ${JSON.stringify(message.d.requestStatus)}`));
  }
});
function request(requestType, requestData = {}) {
  const requestId = randomUUID();
  return new Promise((resolveRequest, reject) => {
    pending.set(requestId, { resolve: resolveRequest, reject });
    socket.send(JSON.stringify({ op: 6, d: { requestType, requestId, requestData } }));
  });
}
const wait = (ms) => new Promise(resolveWait => setTimeout(resolveWait, ms));
async function waitForRecordingToStop() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (!(await request('GetRecordStatus')).outputActive) return;
    await wait(200);
  }
  throw new Error('OBS is still finalizing its recording');
}
const sceneName = 'Portfolio showcase';
const inputName = 'Portfolio public product';
const command = process.argv[2] ?? 'inspect';
try {
  await ready;
  if (['prepare', 'record', 'animate', 'poster'].includes(command)
    && !['affiliacore', 'subiu'].includes(process.argv[3])) throw new Error('Choose affiliacore or subiu');
  if (command === 'inspect') {
    const result = {};
    for (const type of ['GetRecordStatus', 'GetStreamStatus', 'GetVideoSettings', 'GetRecordDirectory', 'GetInputKindList']) result[type] = await request(type);
    console.log(JSON.stringify(result));
  } else if (command === 'prepare') {
    const recording = await request('GetRecordStatus');
    const stream = await request('GetStreamStatus');
    if (recording.outputActive || stream.outputActive) throw new Error('OBS is already recording or streaming');
    if (!existsSync(statePath)) {
      const scene = await request('GetCurrentProgramScene');
      const recordDirectory = await request('GetRecordDirectory');
      const inputs = await request('GetInputList');
      const audio = [];
      for (const input of inputs.inputs.filter((i) => i.inputKind.startsWith('wasapi_'))) {
        const mute = await request('GetInputMute', { inputName: input.inputName });
        audio.push({ inputName: input.inputName, inputMuted: mute.inputMuted });
      }
      writeFileSync(statePath, JSON.stringify({ sceneName: scene.sceneName, recordDirectory: recordDirectory.recordDirectory, audio }));
      await request('CreateScene', { sceneName });
      await request('CreateInput', { sceneName, inputName, inputKind: 'browser_source', inputSettings: { url: 'about:blank', width: 1280, height: 800, reroute_audio: true }, sceneItemEnabled: true });
      const { sceneItemId } = await request('GetSceneItemId', { sceneName, sourceName: inputName });
      const video = await request('GetVideoSettings');
      await request('SetSceneItemTransform', { sceneName, sceneItemId, sceneItemTransform: { positionX: 0, positionY: 0, boundsType: 'OBS_BOUNDS_STRETCH', boundsWidth: video.baseWidth, boundsHeight: video.baseHeight } });
      await request('SetRecordDirectory', { recordDirectory: directory });
      for (const input of audio) await request('SetInputMute', { inputName: input.inputName, inputMuted: true });
    }
    const product = process.argv[3];
    if (!['affiliacore', 'subiu'].includes(product)) throw new Error('Choose affiliacore or subiu');
    const url = product === 'affiliacore' ? 'https://affiliacore.com.br' : 'https://subiu.dev';
    const css = `html{overflow:hidden!important}body{margin:0!important;overflow:hidden!important;background:${product === 'subiu' ? '#eaebe6' : '#11070a'}!important}.reveal,.stagger>*{opacity:1!important;translate:0 0!important}.clip>span{opacity:1!important;translate:0 0!important;animation:none!important}`;
    await request('SetInputSettings', { inputName, inputSettings: { is_local_file: false, url, css, width: 1280, height: 800 }, overlay: true });
    await request('SetCurrentProgramScene', { sceneName });
    console.log(JSON.stringify({ prepared: product, directory }));
  } else if (command === 'animate' || command === 'record') {
    const product = process.argv[3];
    if (!['affiliacore', 'subiu'].includes(product)) throw new Error('Choose affiliacore or subiu');
    const url = product === 'subiu' ? 'https://subiu.dev' : 'https://affiliacore.com.br';
    const file = join(directory, `capture-${product}.html`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Public page returned ${response.status}`);
    const downloaded = await response.text();
    // Next's client router cannot hydrate a file:// document. The public SSR
    // content and styles are enough for capture; only our scroll script runs.
    const markup = product === 'subiu' ? downloaded.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '') : downloaded;
    // Keep the public HTML and its original remote assets, at a normal viewport.
    // A local copy lets the capture scroll without remote page scripting.
    const font = name => readFileSync(resolve('src/assets/fonts/showcase', name)).toString('base64');
    const productFonts = product === 'subiu' ? `
      @font-face{font-family:CaptureArchivo;src:url(data:font/woff2;base64,${font('archivo-400.woff2')})}
      @font-face{font-family:CaptureArchivoBlack;src:url(data:font/woff2;base64,${font('archivo-black-400.woff2')})}
      .font-display{font-family:CaptureArchivoBlack,sans-serif!important}
      .font-body{font-family:CaptureArchivo,sans-serif!important}` : '';
    const motion = `<style>${productFonts}html{scroll-behavior:auto!important}::-webkit-scrollbar{display:none}
      .reveal,.stagger>*{opacity:1!important;translate:0 0!important}
      .clip>span{opacity:1!important;translate:0 0!important;animation:none!important}</style>
      <script>window.addEventListener('load',()=>{const start=performance.now()+2000;
      const ease=p=>p*p*(3-2*p);const distance=${product === 'subiu' ? 620 : 650};
      function pan(now){const p=Math.max(0,Math.min(1,(now-start)/12000));
      const y=p<.18?0:p<.48?ease((p-.18)/.30):p<.67?1:p<.91?1-ease((p-.67)/.24):0;
      window.scrollTo(0,y*distance);if(p<1)requestAnimationFrame(pan)}requestAnimationFrame(pan)});</script>`;
    writeFileSync(file, markup.replace(/<head([^>]*)>/i, `<head$1><base href="${url}/">`).replace(/<\/body>/i, `${motion}</body>`));
    let recordingStarted = false;
    try {
      if (command === 'record') {
        await request('StartRecord');
        recordingStarted = true;
      }
      await request('SetInputSettings', { inputName, inputSettings: { is_local_file: true, local_file: file, css: '' }, overlay: true });
      await request('PressInputPropertiesButton', { inputName, propertyName: 'refreshnocache' });
      if (recordingStarted) await wait(16500);
      else console.log('Animation started');
    } finally {
      if (recordingStarted) {
        const output = await request('StopRecord');
        await waitForRecordingToStop();
        console.log(JSON.stringify(output));
      }
    }
  } else if (command === 'poster') {
    const { imageData } = await request('GetSourceScreenshot', { sourceName: inputName, imageFormat: 'png', imageWidth: 1280, imageHeight: 800 });
    const file = join(directory, `${process.argv[3]}-poster.png`);
    writeFileSync(file, Buffer.from(imageData.split(',')[1], 'base64'));
    console.log(file);
  } else if (command === 'stop') {
    console.log(JSON.stringify(await request('StopRecord')));
    await waitForRecordingToStop();
  } else if (command === 'restore') {
    const state = JSON.parse(readFileSync(statePath, 'utf8'));
    await request('SetCurrentProgramScene', { sceneName: state.sceneName });
    await request('SetRecordDirectory', { recordDirectory: state.recordDirectory.replace(/\\\\/g, '\\') });
    for (const input of state.audio) await request('SetInputMute', input);
    await request('RemoveScene', { sceneName });
    unlinkSync(statePath);
    console.log('Original OBS scene, directory and audio restored');
  } else throw new Error('Unknown command');
} finally {
  socket.close();
}
