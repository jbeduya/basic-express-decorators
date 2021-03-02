# basic-express-decorators

Basic Decorators for Express - Includes supports for `express-validator` using Typescript

# Installation

```
npm install @webgeek/basic-express-decorators
```

## Update your `tsconfig.json`

Enable the following:

```json
{
"experimentalDecorators": true,
"emitDecoratorMetadata": true
}

# Usage

Let's say you have  `controllers` folder. Create two files under it.

`home.ts`
```typescript
import { controller, get } from "basic-express-decorators";
import { Request, Response } from 'express';

@controller()
export class HomeController {
    @get('/')
    index(req: Request, res: Response) {
        res.send('Hello World')
    }

    @get('/demo')
    demo(req: Request, res: Response) {
        res.json({ message: 'This is just a demo'})
    }
}
```

`index.ts`
```typescript
export * from './home'
```

In your express app, do the following:

```typescript
import express from 'express';
import { Router } from 'basic-express-decorators'
import './controllers'

const app = express();
app.use(Router.getInstance())

app.listen(8000, () => console.log('Listening at http://localhost:8000'))
```