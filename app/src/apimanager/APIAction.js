import {
    API_START,
    API_END,
    API_ERROR
} from './types';

export const apiStart = label => ({
    type: API_START,
    payload: label
});

export const apiEnd = label => ({
    type: API_END,
    payload: label
});


export const apiError = (label, error) => ({
    type: API_ERROR,
    payload: { label: label, error: error }
});