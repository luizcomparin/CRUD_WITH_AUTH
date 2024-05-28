import { IPaginationMeta } from "./IPaginationMeta.interface";

export class Pagination<T, TMeta = IPaginationMeta> {
	items: T[];
	meta: TMeta;
}
