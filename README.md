# cwp - Cloudflare Workers Proxy

Based on the worker from Andy Davies at [https://andydavies.me/blog/2020/09/22/exploring-site-speed-optimisations-with-webpagetest-and-cloudflare-workers/](https://andydavies.me/blog/2020/09/22/exploring-site-speed-optimisations-with-webpagetest-and-cloudflare-workers/)

## WebPageTest

Add this to the `script` tab:

```
overrideHost    example.com   proxy.example.workers.dev
navigate    %URL%
```

Replace `example.com` with the site you want to test against.  Replace `proxy.example.workers.dev` with the worker host name you are using.
