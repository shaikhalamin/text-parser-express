
## Text file parser with Node.js Express and Swagger

## Basic Features
    ```bash
        
        1. User call a get endpoint to fetch the number of words from textfile
        2. User call a get endpoint to fetch the number of characters from textfile
        3. User call a get endpoint to fetch the number of sentences from textfile
        4. User call a get endpoint to fetch the number of paragraphs from textfile
        5. User call a get endpoint to fetch the longest words in paragraphs from textfile
    ```
## Project Run Instruction

```bash

Step 1: git clone https://github.com/shaikhalamin/text-parser-express.git

Step 2: cd text-parser-express

Step 3: cp .env.example .env

Step 4: npm i

Step 5: npm run db:seed 5e6  //for 5 million record

Step 6: now copy the filename from src/seeder/data and past the filename in src/controller/fileparser/file-parser.helper.js -- in line 5

Step 7: npm run dev

```
## N:B: Now please open the browser window and go to the swagger api docs at http://localhost:3000/v1/api-docs/ to call the respected api to get the result
