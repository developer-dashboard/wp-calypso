/**
 * External dependencies
 */
import { memoize, trim } from 'lodash';

/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	READER_FETCH_TAG_REQUEST,
	READER_FETCH_TAG_RECEIVE,
	READER_FETCH_TAGS_REQUEST,
	READER_FETCH_TAGS_RECEIVE,
	READER_FOLLOW_TAG_REQUEST,
	READER_FOLLOW_TAG_RECEIVE,
	READER_UNFOLLOW_TAG_REQUEST,
	READER_UNFOLLOW_TAG_RECEIVE,
} from 'state/action-types';

/**
 * Helper function. Turns a tag name into a tag "slug" for use with the API.
 *
 * @param  {String} tag  Tag name to parse into a slug
 * @return {String}      Tag slug
 */
const unmemoizedSlugify = ( tag ) => encodeURIComponent(
	trim( tag )
		.toLowerCase()
		.replace( /\s+/g, '-' )
		.replace( /-{2,}/g, '-' )
);

export const slugify = memoize( unmemoizedSlugify, x => x );

const createRequestAction = ( { requestType, payload, requestKey } ) => {
	return {
		type: requestType,
		payload,
		meta: {
			requestStart: `${ requestType }:${ requestKey }`
		}
	};
};

const createReceiveAction = ( { receiveType, requestType, requestKey, payload, error } ) => {
	return {
		type: receiveType,
		payload,
		error: !! error,
		meta: {
			requestEnd: `${ requestType }:${ requestKey }`
		}
	};
};

//dataFetch: () => wpcom.undocumented().readTags(),
export const requestTags = () => createRequestAction( {
	requestType: READER_FETCH_TAGS_REQUEST,
} );
export const receiveTags = ( { payload, error } ) =>
	createReceiveAction( READER_FETCH_TAGS_RECEIVE )( {
		requestType: READER_FETCH_TAGS_REQUEST,
		receiveType: READER_FETCH_TAGS_RECEIVE,
		error,
		payload,
	} );

// dataFetch: () => wpcom.undocumented().readTag( slug ),
export const requestTag = tag => createRequestAction( {
	requestType: READER_FETCH_TAG_REQUEST,
	requestKey: tag,
} );
export const receiveTag = ( { tag, payload, error } ) => createReceiveAction( {
	receiveTag: READER_FETCH_TAGS_RECEIVE,
	requestTag: READER_FETCH_TAG_REQUEST,
	requestKey: tag,
	payload,
	error,
} );

// dataFetch: () => wpcom.undocumented().unfollowReaderTag( slug ),
export const requestUnfollowTag = createRequestAction( READER_UNFOLLOW_TAG_REQUEST );
export const receiveUnfollowTag = createRequestAction( READER_UNFOLLOW_TAG_RECEIVE );

// dataFetch: () => wpcom.undocumented().followReaderTag( slug ),
export const requestFollowTag = createRequestAction( READER_FOLLOW_TAG_REQUEST );
export const receiveFollowTag = createRequestAction( READER_FOLLOW_TAG_RECEIVE );
