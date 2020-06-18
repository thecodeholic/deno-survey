# Deno Survey App
Survey application with REST API to manage surveys and questions and website, where all surveys are outputted.

## Installation

You need to have [deno installed](https://deno.land/#installation) in order to run this application.<br>
Install also [denon](https://deno.land/x/denon) which watches your file changes and automatically restarts server.

1. Clone the repository
1. Go to the project root folder
1. Copy `.env.example` into `.env` file and adjust the values

    ```dotenv
    # MongoDB connect URI
    MONGODB_URI = mongodb://localhost:27017
    # MondoDB database name
    DB_NAME = deno_survey
    # JWT encryption/decription secret key
    JWT_SECRET_KEY = some-random-key
    # JWT expiration duration
    JWT_EXP_DURATION = 3600000
    ```
1. Run the application by executing

    ```dotenv
    denon run --allow-net --allow-write --allow-read --allow-env --allow-plugin --unstable server.ts
    ```
    
## Usage

In REST API the following endpoints are supported.

<table>
    <thead>
    <tr>
        <th>METHOD</th>
        <th>URL</th>
        <th>Description</th>
        <th>Request</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>POST</td>
        <td>/api/register</td>
        <td>Register</td>
        <td>
            <pre>
json
{
  "name": "test",
  "email": "test@example.com",
  "password": "test"
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/login</td>
        <td>Login</td>
        <td>
            <pre>
json
{
  "email": "test@example.com",
  "password": "test"
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/survey</td>
        <td>Get surveys for authentication user</td>
        <td>(Empty)</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/survey/:id</td>
        <td>Get single survey</td>
        <td>(Empty)</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/survey</td>
        <td>Create survey</td>
        <td>
            <pre>
{
  "name": "Survey name",
  "description": "Survey description"
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/survey/:id</td>
        <td>Update survey</td>
        <td>
<pre lang="json">{
  "name": "Survey name",
  "description": "Survey description"
}</pre>
        </td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/survey/:id</td>
        <td>Delete survey</td>
        <td>(Empty)</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/survey/:surveyId/question</td>
        <td>Get questions for survey</td>
        <td>(Empty)</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/question/:id</td>
        <td>Get single question</td>
        <td>(Empty)</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/question/:surveyId</td>
        <td>Create question for survey</td>
        <td>
<pre lang="json">Single choice question
{
  "text": "How much you liked the Deno Course?",
  "type": "choice",
  "required": true,
  "data": {
    "multiple": false,
    "answers": [
      "I liked it very much",
      "I liked it",
      "I did not like it",
      "I hate it"
    ]
  }
}
Multiple choice question
{
  "text": "Which features do you like in Deno?",
  "type": "choice",
  "required": true,
  "data": {
    "multiple": true,
    "answers": [
      "Typescript",
      "Security",
      "Import from URL",
      "ES6 modules"
    ]
  }
}
Free text question
{
  "text": "Any other comments?",
  "type": "text",
  "required": false
}</pre>
        </td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/question/:id</td>
        <td>Update question</td>
        <td></td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/question/:id</td>
        <td>Delete question</td>
        <td>(Empty)</td>
    </tr>
    </tbody>
</table>
