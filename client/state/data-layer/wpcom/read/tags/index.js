/**
 * Internal dependencies
 */
import {
	READER_FETCH_TAGS_REQUEST,
	READER_FETCH_TAGS_RECEIVE,
} from 'state/action-types';
import wpcom from 'lib/wp';

export function handleTagsRequest( store, action, next ) {
	wpcom.req.get( '/read/tags', { apiVersion: '1.2' } )
		.then(
			payload => {
				store.dispatch( {
					type: READER_FETCH_TAGS_RECEIVE,
					payload,
				} );
			},
			error => {
				store.dispatch( {
					type: READER_FETCH_TAGS_RECEIVE,
					payload: error,
					error: true,
				} );
			}
		);
	next( action );
}

export default {
	[ READER_FETCH_TAGS_REQUEST ]: [ handleTagsRequest ]
};

