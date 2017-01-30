/**
 * Internal dependencies
 */
import {
	READER_UNFOLLOW_TAG_REQUEST,
	READER_UNFOLLOW_TAG_RECEIVE,
} from 'state/action-types';
import wpcom from 'lib/wp';

export function handleUnfollowTagRequest( store, action, next ) {
	wpcom.req.post( `/read/tags/${ action.payload.slug }/mine/delete`, { apiVersion: '1.2' } )
		.then(
			payload => {
				store.dispatch( {
					type: READER_UNFOLLOW_TAG_RECEIVE,
					payload,
				} );
			},
			error => {
				store.dispatch( {
					type: READER_UNFOLLOW_TAG_RECEIVE,
					payload: error,
					error: true,
				} );
			}
		);
	next( action );
}

export default {
	[ READER_UNFOLLOW_TAG_REQUEST ]: [ handleUnfollowTagRequest ]
};

