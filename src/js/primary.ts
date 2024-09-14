import { sleep } from './util/util';
import ytdlp from './util/yt_dlp';
import db from './util/sqlite';

/**
 * 配信完了済みのURLを収集する
 */
const primary = async () => {
  const CHANNEL_LIST = process.env.CHANNEL_LIST;
  if (!CHANNEL_LIST) throw new Error('env CHANNEL_LIST is empty');
  const channelList = CHANNEL_LIST.split(',');
  console.log(`channelList = ${channelList}`);

  const iscontinue = true;
  while (iscontinue) {
    try {
      console.log('check');

      // 最新の配信情報を取得
      for (const channelId of channelList) {
        console.log(`get streamlist channelID = ${channelId}`);
        const ytres = await ytdlp.getStreamList(channelId);
        const tabledata = (await db.selectByChannelId(channelId)) as SqliteYoutubeTableItem[];
        // console.log(tabledata);

        for (const entry of ytres.entries) {
          const id = entry.id;
          const url = entry.webpage_url;
          const title = entry.title;
          const timestamp = entry.timestamp * 1000;
          const status = entry.live_status;
          const date = new Date(timestamp);
          const dateStr = date.toDateString();
          // console.log(`${title} ${url} ${dateStr} ${status}`);

          // 既にテーブルに登録済みのURLの場合はskip
          if (tabledata.find((item) => item.url === url)) continue;

          // liveが完了してるやつだけ投入
          if (status === 'was_live') {
            await db.insert(channelId, id, title, url, timestamp);
          }
        }
      }

      // 30分おきにループ
      await sleep(30 * 60 * 1000);
    } catch (e) {
      console.error(e);
    }
  }
};

export default primary;
