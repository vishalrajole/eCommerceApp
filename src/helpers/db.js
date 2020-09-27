import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const initDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, long REAL NOT NULL, firebaseId TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchPlacesFromDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM places;",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const insertPlace = (
  title,
  imageUri,
  address,
  lat,
  long,
  firebaseId
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO places (title, imageUri, address, lat, long, firebaseId ) VALUES (?, ?, ?, ?, ?, ?);",
        [title, imageUri, address, lat, long, firebaseId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const destroyDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "DROP TABLE places;",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
