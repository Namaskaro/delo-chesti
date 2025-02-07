const RESEND_API_KEY = Deno.env.get('re_UBvHWf9H_9vqMjKGBnBK95We8pKcH4ws2')

const handler = async (_request: Request): Promise<Response> => {
  const body = await _request.json();
  const { to, from, html, subject } = body;

  if (!to || !from || !html || !subject) {
    return new Response(null, {
      status: 404,
      statusText: 'Did not provide the right data',
    });
  }

  

 
  const res = await fetch('https://api.resend.com/emails', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer re_UBvHWf9H_9vqMjKGBnBK95We8pKcH4ws2`,
    },
    body: JSON.stringify({
      from,
    to,
    subject,
    html,
    }),
  })

  const data = await res.json()

  if (data) {
    return new Response(
      JSON.stringify({
        message: data,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  } else {
    return new Response(
      JSON.stringify({
        message: data.error,
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
      },
    );
  }

  // return new Response(JSON.stringify(data), {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
}

Deno.serve(handler)


