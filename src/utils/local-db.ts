import lz from 'lz-string';
import { HaveId, PageQuery, PageResponse, PageResponseImpl } from '@/dto/base';

/** Local db interface */
export interface LocalDb<T extends HaveId> {
  /** Page query */
  pageQuery(query: PageQuery<T>): PageResponse<T>;
  /** Single query */
  query(query: T): T | undefined;
  /** Get by id */
  get(id: string): T | undefined;
  /** Save data, returns false if id exists */
  save(data: T): boolean;
  /** Update a data, returns false if data not exists */
  update(data: T): boolean;
  /** Delete data by id, returns deleted data if exists */
  delete(id: string): T | undefined;
  /** Clear this database */
  clear(): void;
}

/** Local db manager, contains serval db */
export interface LocalDbManager {
  getDb<T extends HaveId>(name: string): LocalDb<T>;
}

interface Database<T extends HaveId> { index: {[key: string]: number}; data: T[]; }

interface DatabaseSerializer<T extends HaveId> {

  serialize(db: Database<T>): string ;

  deserialize(data: string): Database<T>;
}

/**
 * Normal database(toy) implementation.
 */
class LocalDbImpl<T extends HaveId> implements LocalDb<T> {
  private static DB_NAME_PREFIX = 'local_db_';

  private name: string;
  private database: Database<T> = { index: {}, data: [] };

  constructor (
    name: string,
      private backend: Storage,
      private serializer: DatabaseSerializer<T>
  ) {
    this.name = LocalDbImpl.DB_NAME_PREFIX + name;
    this.load();
  }

  public load () {
    const persistenced = this.backend.getItem(this.name);
    if (persistenced !== null) {
      this.database = this.serializer.deserialize(persistenced);
    }
  }

  public sync () {
    this.backend.setItem(this.name, this.serializer.serialize(this.database));
  }

  /**
   * Paagination query.
   *
   * This query method only supports 'equals' condition.
   *
   * This method implemented as a FOOLISH way, loop every data.
   *
   * @param query Query condition
   */
  public pageQuery (query: PageQuery<T>): PageResponse<T> {
    const { pageNo, pageSize } = query;
    if (pageNo <= 0) {
      throw new Error(`pageNo [${pageNo} lesser than 1]`);
    }
    const queryData = query.query;
    // If id is a condition, returns via indeex
    if (queryData) {
      const id: string | undefined = queryData.id;

      if (id) {
        const data = this.get(id);
        if (data !== undefined) {
          return new PageResponseImpl(pageNo, pageSize, [ data ], 1);
        } else {
          return new PageResponseImpl(pageNo, pageSize, [], 0);
        }
      } else {
        // LET'S LOOP AND FILTER EVERYTHING!!!
        const allResult = this.database.data.filter((data) => this.matchData(data, queryData));

        // Deal with pagination
        const allLength = allResult.length;
        const start = (pageNo - 1) * pageSize;
        const end = start + pageSize;
        if (start >= allLength) {
          return new PageResponseImpl(pageNo, pageSize, [], 0);
        } else {
          const resultList = allResult.slice(start, Math.min(end, allLength) - 1);
          return new PageResponseImpl(pageNo, pageSize, resultList, resultList.length);
        }
      }
    } else {
      // Deal with pagination
      const allResult = this.database.data;
      const allLength = allResult.length;
      const start = (pageNo - 1) * pageSize;
      const end = start + pageSize;
      if (start >= allLength) {
        return new PageResponseImpl(pageNo, pageSize, [], 0);
      } else {
        const resultList = allResult.slice(start, Math.min(end, allLength) - 1);
        return new PageResponseImpl(pageNo, pageSize, resultList, resultList.length);
      }
    }
  }
  public query (query: T): T | undefined {
    throw new Error('Method not implemented.');
  }
  public get (id: string): T | undefined {
    const index = this.database.index[id];
    return index === undefined ? undefined : this.database.data[index];
  }
  public save (data: T): boolean {
    // You cannot determine id, I DETERMINE IT!
    if (data.id) {
      return false;
    }
    data.id = this.generateId();
    const currentLength = this.database.data.length;
    this.database.data.push(data);
    this.database.index[data.id] = currentLength;

    this.sync();
    return true;
  }
  public update (data: T): boolean {
    // This is 'UPDATE BY ID', other attributes? nope.
    if (data.id) {
      const index = this.database.index[data.id];
      if (index !== undefined) {
        this.database.data[index] = data;
        this.sync();
        return true;
      }
    }
    return false;
  }
  public delete (id: string): T | undefined {
    const index = this.database.index[id];
    if (index !== undefined) {
      const data = this.database.data.splice(index, 1)[0];
      // Every index in this.database.index who larger than current index need minus 1

      for (const loopId of Object.keys(this.database.index)) {
        const loopIndex = this.database.index[loopId];
        if (loopIndex > index) {
          this.database.index[loopId] = loopIndex - 1;
        }
      }
      delete this.database.index[id];

      this.sync();
      return data;
    }
  }
  public clear (): void {
    throw new Error('Method not implemented.');
  }

  private generateId (): string {
    const list = this.database.data;
    if (list.length > 0) {
      const numId = parseInt(list[list.length - 1].id!, 10);
      return (numId + 1).toString();
    } else {
      return '1';
    }
  }

  /** Check if you gave 'query', the 'origin' can match it. */
  private matchData (origin: T, query: T): boolean {
    for (const key of Object.keys(origin)) {
      const dataValue = (origin as any)[key];
      const queryValue = (query as any)[key];
      if (queryValue !== undefined && queryValue !== null) {
        if (queryValue !== dataValue) {
          return false;
        }
      }
    }
    return true;
  }
}

class JsonSerializer<T extends HaveId> implements DatabaseSerializer<T> {
  public serialize (db: Database<T>): string {
    return JSON.stringify(db);
  }

  public deserialize (data: string): Database<T> {
    return JSON.parse(data);
  }
}

class LzJsonSerializer<T extends HaveId> extends JsonSerializer<T> {
  public serialize (db: Database<T>): string {
    return lz.compress(super.serialize(db));
  }

  public deserialize (data: string): Database<T> {
    return JSON.parse(lz.decompress(data));
  }
}

export class LocalDbManagerLzImpl implements LocalDbManager {
  public getDb<T extends HaveId> (name: string, storage: Storage = localStorage): LocalDb<T> {
    return new LocalDbImpl<T>(name, storage, new LzJsonSerializer());
  }
}

export class LocalDbManagerImpl implements LocalDbManager {
  public getDb<T extends HaveId> (name: string, storage: Storage = localStorage): LocalDb<T> {
    return new LocalDbImpl<T>(name, storage, new JsonSerializer());
  }
}
