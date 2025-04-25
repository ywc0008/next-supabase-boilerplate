type WithRequired<T, K extends keyof T = never> = Omit<T, K> & Required<Pick<T, K>>;

export interface ApiPaginationProps {
	page: number;
	limit: number;
}

export interface ApiPropsWithFilter<T, K extends keyof T = never> {
	filters: WithRequired<Partial<T>, K>;
}

export interface ApiPaginationPropsWithFilter<T, K extends keyof T = never> extends ApiPaginationProps {
	filters: WithRequired<Partial<T>, K>;
}

export interface ApiResult {
	result: boolean;
	message?: string | null;
}

export interface ApiResultWithItemResultTrue<T> extends ApiResult {
	result: true;
	item: T;
}
interface ApiResultWithItemResultFalse extends ApiResult {
	result: false;
	message: string;
	item?: null;
}
export type ApiResultWithItem<T> = ApiResultWithItemResultTrue<T> | ApiResultWithItemResultFalse;

interface ApiResultWithItemsResultTrue<T> extends ApiResult {
	result: true;
	totalCount: number;
	items: T[];
}

interface ApiResultWithItemsResultFalse extends ApiResult {
	result: false;
	message: string;
	totalCount?: null;
	items?: null;
}

export type ApiResultWithItems<T> = ApiResultWithItemsResultTrue<T> | ApiResultWithItemsResultFalse;
