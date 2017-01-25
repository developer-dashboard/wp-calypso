/**
 * Internal dependencies
 */
import {
	READER_FOLLOW_TAG_REQUEST,
	READER_FOLLOW_TAG_RECEIVE,
} from 'state/action-types';
import wpcom from 'lib/wp';

export function handleFollowRequest( store, action, next ) {
	wpcom.req.post( `/read/tags/${ action.payload.slug }/mine/new`, { apiVersion: '1.2' } )
		.then(
			payload => {
				store.dispatch( {
					type: READER_FOLLOW_TAG_RECEIVE,
					payload,
				} );
			},
			error => {
				store.dispatch( {
					type: READER_FOLLOW_TAG_RECEIVE,
					payload: error,
					error: true,
				} );
			}
		);
	next( action );
}

export default {
	[ READER_FOLLOW_TAG_REQUEST ]: [ handleFollowRequest() ]
};

