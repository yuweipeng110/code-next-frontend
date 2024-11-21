import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getPagePath = () => window.location.href.split('?')[0];

export const getRequestQuery = (url: string) => parse(url.split('?')[1]);

export const getRequestPath = (url: string) => parse(url.split('?')[0]);