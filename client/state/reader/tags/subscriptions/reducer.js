/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	READER_FETCH_TAG_REQUEST,
	READER_FETCH_TAG_REQUEST_SUCCESS,
	READER_FETCH_TAG_REQUEST_FAILURE,
	READER_FETCH_TAGS_REQUEST,
	READER_FETCH_TAGS_REQUEST_SUCCESS,
	READER_FETCH_TAGS_REQUEST_FAILURE,
	READER_FOLLOW_TAG_REQUEST,
	READER_FOLLOW_TAG_REQUEST_SUCCESS,
	READER_FOLLOW_TAG_REQUEST_FAILURE,
	READER_UNFOLLOW_TAG_REQUEST,
	READER_UNFOLLOW_TAG_REQUEST_SUCCESS,
	READER_UNFOLLOW_TAG_REQUEST_FAILURE,
} from 'state/action-types';
import { createReducer } from 'state/utils';

const items = createReducer( {}, {
	[ READER_FETCH_TAG_REQUEST_SUCCESS ]: ( state, action ) => console.error( action ),
	[ READER_FETCH_TAGS_REQUEST_SUCCESS ]: ( state, action ) => console.error( action ),
	[ READER_FOLLOW_TAG_REQUEST_SUCCESS ]: ( state, action ) => console.error( action ),
	[ READER_UNFOLLOW_TAG_REQUEST_SUCCESS ]: ( state, action ) => console.error( action ),
} );


export default combineReducers( {
	items,
	requesting,
} );
