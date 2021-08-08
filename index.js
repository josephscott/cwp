const site = 'wordpress.com';

/* *** */

addEventListener( 'fetch', event => {
	event.respondWith( handleRequest( event.request ) );
} );

async function handleRequest( request ) {
	const url = new URL( request.url );

	const host = request.headers.get( 'x-host' );
	if ( !host ) {
		return new Response( 'No x-host header', {
			status: 403
		} );
	}

	url.hostname = host;

	if ( url.pathname === '/robots.txt' ) {
		return new Response( 'User-agent: *\nDisallow: /' );
	}

	const response = await fetch( url.toString(), request );

	return fetch( url.toString(), request );
}
