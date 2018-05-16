# Photobook

## EJS:
* landing page
* index page
* new page
* create page
* show page

## Each users:
* Name
* Image
* Description

## RESTFUL ROUTES

| route   | url             | HTTP verb  |   Description                              |
| :------ |:--------------- | :--------- | :----------------------------------------- |
| INDEX   | /life           | GET        |  Display all views                         |
| NEW     | /life/new       | GET        |  A form to create a new view               |
| CREATE  | /life           | POST       |  Add new view to DB; redirect to index     |
| SHOW    | /life/:id       | GET        |  Show more info about a specific view      |
| comment NEW    | /life/:id/comments/new | GET  | A form to create a new comment     |
| comment CREATE | /life/:id/comments    | POST | Add a new comment to DB; redirect to show |
| EDIT    | /life/:id/edit | GET         | Show a form for editing view               |
| UPDATE  | /life/:id      | PUT         | Updata a specific view; redirect to show   |
| Destroy | /life/:id      | DELETE      | Delete a specific view; redirect to index  |
