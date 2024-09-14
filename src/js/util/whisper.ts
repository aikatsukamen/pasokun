import whisperNode from 'whisper-node';

const transcribe = async (filepath: string) => {
  const options = {
    modelName: 'large-v3',
    // modelPath: "/custom/path/to/model.bin", // use model in a custom directory (cannot use along with 'modelName')
    whisperOptions: {
      language: 'ja', // default (use 'auto' for auto detect)
      gen_file_txt: false, // outputs .txt file
      gen_file_subtitle: true, // outputs .srt file
      gen_file_vtt: false, // outputs .vtt file
      word_timestamps: false, // timestamp for every word
      vad_filter: true,
      // timestamp_size: 0      // cannot use along with word_timestamps:true
    },
  };
  const transcript: {
    start: string;
    end: string;
    speech: string;
  } = await whisperNode(filepath, options);

  return transcript;
};

export default {
  transcribe,
};
