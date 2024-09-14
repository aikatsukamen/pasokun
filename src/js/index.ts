import cluster from 'cluster';
import primary from './primary';
import worker from './worker';

const numProcs = process.env.WORKER_NUM ? Number(process.env.WORKER_NUM) : 1;

let lastDead: Date | null = null;
const ALIVE_MSEC_INTERVAL = 30 * 1000;

if (cluster.isPrimary) {
  // 子プロセス起動
  for (let i = 0; i < numProcs; i++) {
    cluster.fork();
  }

  // workerプロセスが死んだ時
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`PID:${worker.process.pid} is dead`);

    // 連続死の場合はprimaryを停止
    const now = new Date();
    if (lastDead && now.getTime() - lastDead.getTime() < ALIVE_MSEC_INTERVAL) {
      process.exit(1);
    } else {
      lastDead = new Date();
      // 再実行
      cluster.fork();
    }
  });

  // URL監視処理開始
  // primary();
} else {
  // 子プロセスの初期処理
  worker();
}

/**
 * シャットダウン処理
 */
const shutdown = () => {
  console.log('終了信号を受信しました。');
  setTimeout(() => {
    process.exit(0);
  }, 500);
};
// 終了信号を受信
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
