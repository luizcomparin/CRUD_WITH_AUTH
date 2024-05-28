import { SelectQueryBuilder } from "typeorm"
import { Pagination } from "./pagination.response"
import { IPaginationMeta } from "./IPaginationMeta.interface"
import { IPaginationOptions } from "./IPaginationOptions.interface"

export default async function runQueryWithPagination<T>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions) {
	const itemsPerPage = typeof options.limit === 'string' ? parseInt(options.limit) : options.limit
	const page = typeof options.page === 'string' ? parseInt(options.page) : options.page
	const skip = (itemsPerPage * page) - itemsPerPage
	const totalItems = await queryBuilder.getCount()
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const getManyResult = await queryBuilder.take(itemsPerPage).skip(skip).getMany()
	const dataWithPagination = {
		items: getManyResult,
		meta: {
			totalItems: totalItems,
			itemCount: getManyResult.length,
			itemsPerPage: itemsPerPage,
			totalPages: totalPages,
			currentPage: page
		} as IPaginationMeta
	}
	console.log(dataWithPagination.meta)
	return dataWithPagination as Pagination<T>
}
