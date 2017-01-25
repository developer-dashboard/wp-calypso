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
const unmemoizedSlugify = ( tag ) => encodeURIComponent(
	trim( tag )
		.toLowerCase()
		.replace( /\s+/g, '-' )
		.replace( /-{2,}/g, '-' )
);

const slugify = memoize( unmemoizedSlugify, x => x );

//dataFetch: () => wpcom.undocumented().readTags(),
export const requestTags = () => ( {
	type: READER_FETCH_TAGS_REQUEST,
} );

// dataFetch: () => wpcom.undocumented().readTag( slug ),
export const requestTag = ( tag ) => ( {
	type: READER_FETCH_TAG_REQUEST,
	payload: {
		slug: slugify( tag )
	},
} );

// dataFetch: () => wpcom.undocumented().unfollowReaderTag( slug ),
export const requestUnfollowTag = ( tag ) => ( {
	type: READER_UNFOLLOW_TAG_REQUEST,
	payload: {
		slug: slugify( tag )
	},
} );

export const requestFollowTag = ( tag ) => ( {
	type: READER_FOLLOW_TAG_REQUEST,
	payload: {
		slug: slugify( tag )
	},
} );

