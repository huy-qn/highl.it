// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Readability} from "@mozilla/readability";
import { JSDOM } from 'jsdom';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query['url'] ?? [];
  const readMode = (req.query['reader'] ?? 'false') === 'true';
  if (typeof url === 'string') {
    const response = await fetch(url);
    let html = await response.text();

    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    html = html
        .replace(/src="\//g, `src="https://${hostname}/`)
        .replace(/src='\//g, `src='https://${hostname}/`)
        .replace(/href="\//g, `href="https://${hostname}/`)
        .replace(/href='\//g, `href='https://${hostname}/`);

    html = html.replace(/<script(.|\n)*?<\/script>/g, '');

    html = html.replace(/<body(.*)>/, `
    <body$1>
    <style>
    .highlight {
      --bg: #64ffda;
      --weight: 3px;
      background: var(--bg);
      border-radius: var(--weight);
      box-shadow: 0 var(--weight) 0 0 var(--bg); /* Border bottom */
      box-shadow: 0 -var(--weight) 0 0 var(--bg); /* Border top */
      box-shadow: -var(--weight) 0 0 0 var(--bg); /* Border left */
      box-shadow: var(--weight) 0 0 0 var(--bg); /* Border right */
      box-shadow: 0 0 0 var(--weight) var(--bg); /* All the borders by using the spread properties */
    }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-core.min.js" integrity="sha512-N+AGrlJCI4ov6LmtY/2SIm8kAcSAp9lhrYhVFmUhMBuFwQy3xEMNj+cPG4bg0N4XkL7Rw2+sKW8hg8v1MF5yLQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-classapplier.min.js" integrity="sha512-2Fxf2CgovcFRS+dkK9j68CxEBJfh0ukrHOYigMTR4Dw/y+KWda8Lj2ubH6lXnjprmHf/MCEpF/kP/fSMjrrRRg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-selectionsaverestore.min.js" integrity="sha512-40/cVQ39VPjTs1eG+XPt/iFbY+d3FwiH2YbH/nhy1XDr1i1elaxIM1+r7Xy3MMrz/RCsRTYNXKyJEhu/8AGQlg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-highlighter.min.js" integrity="sha512-I+15hnvXZEkBmdHXIN4N59PY+dbkKBqjQpA+N9fNh9ljYKcrXbgjVilILDXgO9cfdncwB00rcEQt2IsvZjflPA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>window.__contentUrlHash = window.btoa('${url}');</script>
    <script src="/hl-content.js"></script>`);

    if (readMode) {
      const doc = new JSDOM(html);
      const article = new Readability(doc.window.document).parse();

      html = `<h1>${article?.title ?? ''}</h1><br/><p></p>${article?.content ?? ''}`;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } else {
    res.status(404).send('URL NOT FOUND');
  }
}

