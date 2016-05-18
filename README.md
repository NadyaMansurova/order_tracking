Here is a small application for work with orders list.

You can work in production and development mode.
Anyway you should enter in folder:

>cd order_tracking

>order_tracking> npm install

production mode:

>order_tracking> npm run deploy

>order_tracking> node index.js

In browser:
localhost:3000

development mode:
>order_tracking> npm run dev

in other cmd terminal:
>order_tracking> node index.js

In browser:
http://localhost:8080/frontend/dev/index.html

I used express framework, webpack task runner (webpack-dev-server for development mode), angular.js and twitter bootstrap for css

------------------------------------------

If you don't want to work with webUI, you can simply make with params:

- for select by company name:

>order_tracking> node parsingTest.js company 'SuperTrader'

- for select by address:

>order_tracking> node parsingTest.js address 'Steindamm 80'

- for delete by id:

>order_tracking> node parsingTest.js remove '001'

- for order how often each item has been ordered, in descending order:

>order_tracking> node parsingTest.js order

