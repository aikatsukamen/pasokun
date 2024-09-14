import fs from 'fs';
import { sleep } from './util/util';
import ytdlp from './util/yt_dlp';
import db from './util/sqlite';
import path from 'path';
import whisper from './util/whisper';
import chatgpt from './util/chatgpt';

const worker = async () => {
  const iscontinue = true;
  while (iscontinue) {
    console.log('[worker] check');

    const list = (await db.selectWait()) as SqliteYoutubeTableItem[];
    for (const item of list) {
      try {
        console.log(`[worker] process start. ${item.channel_id} ${item.url}`);
        // await db.updateStatus(item.id, 'inprogress');

        // 自動生成字幕をダウンロード
        const filepath = path.join(__dirname, '../../data', `${item.id}`);
        const srtpath = filepath + '.ja.srt';
        // await ytdlp.getSubtitle(item.url, filepath);
        const subtitle = fs.readFileSync(srtpath).toString().replace(/<.+?>/g, '');
        // console.log(JSON.stringify(subtitle));

        await chatgpt.conversation('次のsrtフォーマットを要約せよ\n' + subtitle);

        // audioをダウンロード
        // const filepath = path.join(__dirname, '../../data', `${item.id}.wav`);
        // const srtPath = filepath + '.srt';
        // if (fs.existsSync(filepath)) fs.rmSync(filepath);
        // await ytdlp.getStreamAudio(item.url, filepath);
        // console.log(`[worker] download audio is done. path=${filepath}`);

        // whisperでtranscribe
        // console.log(`[worker] transcribe start: ${new Date()}`);
        // const transcript = await whisper.transcribe(filepath);
        // console.log(transcript);
        // console.log(`[worker] transcribe end: ${new Date()}`);

        await sleep(600 * 1000);
        // await db.updateStatus(item.id, 'completed');
      } catch (e) {
        console.error(e);
        // await db.updateStatus(item.id, 'failed');
      }
    }

    await sleep(60 * 1000);
  }
};

export default worker;
