export const GENERATE_LAYOUT_PROMPT = `
    Generate a Learning Course based on the following details. 
    Output strictly in JSON format.

    Fields required:
    - Course Name, Description
    - bannerImagePrompt: A detailed prompt to generate a modern, flat-style 2D digital illustration (blues, purples, oranges) for this course.
    - chapters: Array of chapters (Chapter Name, Duration, Topics list).

    Schema:
    {
       "course": {
          "name": "string",
          "description": "string",
          "category": "string",
          "level": "string",
          "includeVideo": "boolean",
          "noOfChapters": "number",
          "bannerImagePrompt": "string",
          "duration": "string",
          "chapters": [
            { 
               "chapterName": "string",
               "duration": "string",
               "topics": [
                   "string", "string"
               ],
            }
          ]
       }
    }

    User Input: 
`


export const CONTENT_PROMPT = `
    Generate HTML content for the following Chapter and Topic.
    Output strictly in JSON.
    Schema: {
        "chapterName": "string",
        "topics": [
            {
                "topic": "string",
                "content": "<p>HTML Content here...</p>"
            }
        ]
    }
    Input:
`