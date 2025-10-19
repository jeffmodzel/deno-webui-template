import { APP_VERSION, greet, PORT, getLogger } from '@workspace/lib';
import { serveDir } from '@std/http/file-server';

const logger = getLogger();

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);  
  logger.info(`${req.method} ${url.pathname}`);

  // API endpoints
  if (url.pathname === '/api') {
    return new Response(
      JSON.stringify({
        message: greet('API Server'),
        version: APP_VERSION,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { 'content-type': 'application/json' },
      },
    );
  }

  if (url.pathname === '/api/names' && req.method === 'GET') {
    logger.debug('in api/names');
    const names = [
      'John Doe',
      'Jane Smith',
      'Mike Johnson',
      'Sarah Wilson',
      'Alex Chen',
      'Emily Davis',
      'David Brown',
      'Lisa Garcia',
    ];

    return new Response(
      JSON.stringify({
        names: names,
        count: names.length,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { 'content-type': 'application/json' },
      },
    );
  }

  if (url.pathname === '/api/user-information' && req.method === 'POST') {
    try {
      const userData = await req.json();

      // Print the posted data to console
      console.log('User Information Received:');
      console.log('First Name:', userData.firstName);
      console.log('Last Name:', userData.lastName);
      console.log('Age:', userData.age);
      console.log('Occupation:', userData.occupation);
      console.log('Gender:', userData.gender);
      console.log('Full Data:', JSON.stringify(userData, null, 2));

      return new Response(
        JSON.stringify({
          message: 'User information received successfully',
          data: userData,
          timestamp: new Date().toISOString(),
        }),
        {
          headers: { 'content-type': 'application/json' },
        },
      );
    } catch (error) {
      console.error('Error processing user information:', error);
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Invalid JSON payload',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 400,
          headers: { 'content-type': 'application/json' },
        },
      );
    }
  }

  if (url.pathname === '/health') {
    return new Response(JSON.stringify({ status: 'ok' }), {
      headers: { 'content-type': 'application/json' },
    });
  }

  if (url.pathname.startsWith('/api/')) {
    logger.warn(`API endpoint ${url.pathname} not implemented, returning 404`);
    return new Response(
      JSON.stringify({
        error: 'Not Found',
        message: `API endpoint ${url.pathname} not found`,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 404,
        headers: { 'content-type': 'application/json' },
      },
    );
  }

  // Serve files from the frontend dist directory
  return serveDir(req, {
    fsRoot: '../frontend/dist',
    urlRoot: '',
  });
};

logger.info(`Web server running on http://localhost:${PORT}`);
Deno.serve({ port: PORT }, handler);
