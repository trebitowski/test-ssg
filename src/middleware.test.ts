/**
 * @jest-environment node
 */

import { NextURL } from 'next/dist/server/web/next-url';
// eslint-disable-next-line
// @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';
import { instance, mock, reset, when } from 'ts-mockito';
import middleware from './middleware';

const mockedRequest: NextRequest = mock(NextRequest);

afterEach(() => {
  reset(mockedRequest);
});

describe('middleware', () => {
  it('rewrites US subdomain /to/test', async () => {
    const nextUrl = new NextURL('/to/test', 'https://us.example.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(200);
    expect(result?.headers.get('x-middleware-rewrite')).toEqual(
      'https://us.example.com/_forms/us.example.com/test'
    );
  });

  it('rewrites EU subdomain /to/test', async () => {
    const nextUrl = new NextURL('/to/test', 'https://eu.example.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(200);
    expect(result?.headers.get('x-middleware-rewrite')).toEqual(
      'https://eu.example.com/_forms/eu.example.com/test'
    );
  });

  it('rewrites US subdomain /to/test2', async () => {
    const nextUrl = new NextURL('/to/test2', 'https://us.example.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(200);
    expect(result?.headers.get('x-middleware-rewrite')).toEqual(
      'https://us.example.com/_forms/us.example.com/test2'
    );
  });

  it('rewrites index query slug /to/test', async () => {
    const nextUrl = new NextURL('/?slug=test', 'https://us.example.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(200);
    expect(result?.headers.get('x-middleware-rewrite')).toEqual(
      'https://us.example.com/_forms/us.example.com/test'
    );
  });

  it('rewrites custom domain', async () => {
    const nextUrl = new NextURL('/?slug=test', 'https://custom.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(200);
    expect(result?.headers.get('x-middleware-rewrite')).toEqual(
      'https://custom.com/_forms/custom.com/test'
    );
  });

  it('rewrites custom domain with to/:slug', async () => {
    const nextUrl = new NextURL('/to/test', 'https://custom.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(200);
    expect(result?.headers.get('x-middleware-rewrite')).toEqual(
      'https://custom.com/_forms/custom.com/test'
    );
  });

  it('redirects to google if no slug', async () => {
    const nextUrl = new NextURL('/to/', 'https://custom.com');

    when(mockedRequest.nextUrl).thenReturn(nextUrl);
    const result = await middleware(instance(mockedRequest));
    expect(result?.status).toBe(307);
    expect(result?.headers.get('location')).toEqual('https://google.com/');
  });
});
