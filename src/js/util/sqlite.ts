import path from 'path';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(path.join(__dirname, '../../../data/database.sqlite'));
const TABLE_NAME = 'youtube';

const selectByChannelId = async (channelId: string) => {
  return new Promise((resolve, reject) => {
    db.all(`select * from ${TABLE_NAME} where channel_id = "${channelId}"`, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const selectWait = async () => {
  return new Promise((resolve, reject) => {
    db.all(`select * from ${TABLE_NAME} where status = "wait"`, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const updateStatus = async (id: string, status: SqliteYoutubeTableItem['status']): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.all(`update ${TABLE_NAME} set status = "${status}" where id = "${id}"`, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const insert = async (channelId: string, id: string, title: string, url: string, timestamp: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(`insert into ${TABLE_NAME}(channel_id,id,title,url,timestamp) values(?,?,?,?,?)`, channelId, id, title, url, timestamp, (err: any) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export default {
  selectByChannelId,
  selectWait,
  updateStatus,
  insert,
};
