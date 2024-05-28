export interface IPaginationOptions {
	/**
	 * @default 10
	 * the amount of items to be requested per page
	 */
	limit: number | string;
	/**
	 * @default 1
	 * the page that is requested
	 */
	page: number | string;
}
