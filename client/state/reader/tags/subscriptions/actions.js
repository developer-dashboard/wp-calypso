/**
 * External dependencies
 */
import trim from 'lodash/trim';

/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	READER_FETCH_TAG_REQUEST,
	READER_FETCH_TAGS_REQUEST,
	READER_FOLLOW_TAG_REQUEST,
	READER_UNFOLLOW_TAG_REQUEST,
} from 'state/action-types';
import { createActionThunk } from 'state/utils';

/**
 * Helper function. Turns a tag name into a tag "slug" for use with the API.
 *
 * @param  {String} tag  Tag name to parse into a slug
 * @return {String}      Tag slug
 */
const slugify = ( tag ) => encodeURIComponent(
	trim( tag )
		.toLowerCase()
		.replace( /\s+/g, '-' )
		.replace( /-{2,}/g, '-' )
);

export const requestTags = () => createActionThunk( {
	requestAction: READER_FETCH_TAGS_REQUEST,
	dataFetch: () => wpcom.undocumented().readTags(),
} );

export const requestTag = ( tag ) => {
	const slug = slugify( tag );

	return createActionThunk( {
		requestAction: READER_FETCH_TAG_REQUEST,
		dataFetch: () => wpcom.undocumented().readTag( slug ),
		meta: { tag, slug },
	} );
};

export const requestUnfollowTag = ( tag ) => {
	const slug = slugify( tag );

	return createActionThunk( {
		requestAction: READER_UNFOLLOW_TAG_REQUEST,
		dataFetch: () => wpcom.undocumented().unfollowReaderTag( slug ),
		meta: { tag, slug },
	} );
};

export const requestFollowTag = ( tag ) => {
	const slug = slugify( tag );

	return createActionThunk( {
		requestAction: READER_FOLLOW_TAG_REQUEST,
		dataFetch: () => wpcom.undocumented().followReaderTag( slug ),
		meta: { tag, slug },
	} );
};


