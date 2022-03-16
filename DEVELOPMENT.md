# Development Notes

There are two parts of this project:

- The content script (highlighter): the code logic that will be injected to the rendered page, this is where highligher logic works
- The viewer: the code to render the page into an iframe and handle control mode

To start the development server, run the viewer:

```
npm run dev
```

Then run the content script build:

```
npm run build-content:dev
```

Before any deployment, run the content script build:

``` 
npm run build-content
```

Then deploy.