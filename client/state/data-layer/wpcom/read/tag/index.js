/**
 * Internal dependencies
 */
import { READER_FETCH_TAG_REQUEST, READER_FETCH_TAG_RECEIVE} from 'state/action-types';
import wpcom from 'lib/wp';

export function handleTagRequest( store, action, next ) {
	wpcom.req.get( `/read/tags/${ action.payload.slug }`, { apiVersion: '1.2' } )
		.then(
			payload => {
				store.dispatch( {
					type: READER_FETCH_TAG_RECEIVE,
					payload,
				} );
			},
			error => {
				store.dispatch( {
					type: READER_FETCH_TAG_RECEIVE,
					payload: error,
					error: true,
				} );
			}
		);
	next( action );
}

export default {
	[ READER_FETCH_TAG_REQUEST ]: [ handleTagRequest ]
};

