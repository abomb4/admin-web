/** Common data structures */

export interface HaveId {
    id?: string;
}

export interface PageQuery<T> {
    pageNo: number;
    pageSize: number;
    query?: T;
}

export interface PageResponse<T extends HaveId> {
    pageNo: number;
    pageSize: number;
    data: T[];
    total: number;
}

export class PageResponseImpl<T> implements PageResponse<T> {
  constructor (
        public pageNo: number,
        public pageSize: number,
        public data: T[],
        public total: number
  ) {}
}
