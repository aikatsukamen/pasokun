import { execSync } from 'child_process';

const getStreamList = async (channelId: string) => {
  const url = `https://www.youtube.com/${channelId}/streams`;
  const command = `yt-dlp --dump-single-json ${url} --playlist-end 2`;
  const res = execSync(command).toString();

  return JSON.parse(res) as YtDlpChannelPlaylist;
};

const getStreamAudio = async (url: string, pathWav: string) => {
  const pathMp3 = pathWav.replace('.wav', '.mp3');
  // audio download
  let command = `yt-dlp ${url} -f bestaudio -x --audio-format mp3 -o ${pathMp3}`;
  console.log(command);
  execSync(command);

  // convert to mono 16k
  command = `ffmpeg -loglevel warning -i ${pathMp3} -ac 1 -ar 16000 ${pathWav}`;
  console.log(command);
  execSync(command);

  return;
};

const getSubtitle = async (url: string, filepath: string) => {
  const command = `yt-dlp --skip-download --write-subs --write-auto-subs --sub-lang ja --sub-format ttml --convert-subs srt ${url} --output ${filepath}`;
  execSync(command);

  return;
};

export default {
  getStreamList,
  getStreamAudio,
  getSubtitle,
};
