import { parseAsString, useQueryState } from 'nuqs';

export function useSearchParams() {
	return useQueryState(
		'search',
		parseAsString.withDefault('').withOptions({ clearOnDefault: true })
	);
}
