const site = 'wordpress.com';

const rewriter = new HTMLRewriter()
	.on( 'title', {
		element: el => {
			el.prepend( 'CWP: ' );
		}
	} )

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
	const acceptHeader = request.headers.get( 'accept' );
	const bypass = request.headers.get( 'x-bypass' );

	if ( url.pathname === '/robots.txt' ) {
		return new Response( 'User-agent: *\nDisallow: /' );
	}

	const response = await fetch( url.toString(), request );
	if (
		host === site
		&& ( acceptHeader && acceptHeader.indexOf( 'text/html' ) >= 0 )
		&& ( !bypass || ( bypass && bypass.indexOf( 'true' ) === -1 ) )
	) {
		return rewriter.transform( response );
	}

	return response;
}
