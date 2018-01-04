import * as actionType from './ActionType';

export function search(input) {
    return {
        type: actionType.SEARCH,
        input:input
    };
}