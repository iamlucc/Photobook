# Photobook

EJS:
* landing page
* index page
* new page
* create page
* show page

Each users:
* Name
* Image
* Description

<<<<<<< HEAD
RESTFUL ROUTES
route   url             HTTP verb    Description
===============================================
INDEX   /life           GET          Display all views
NEW     /life/new       GET          A form to create a new view
CREATE  /life           POST         Add new view to DB; redirect to index
SHOW    /life/:id       GET          Show more info about a specific view

comment NEW     /life/:id/comments/new  GET
comment CREATE   /life/:id/comments      POST

EDIT    /life/:id/edit  GET          Show a form for editing view
UPDATE  /life/:id       PUT          Updata a specific view; redirect to show
Destroy /life/:id       DELETE       Delete a specific view; redirect to index
=======
## RESTFUL ROUTES
| route   |   url           | HTTP verb  |  Description                               |
| :------ |:--------------- | :--------- | :----------------------------------------- |
| INDEX   |   /life         | GET        |  Display all views                         |
| NEW     |  /life/new      | GET        |  A form to create a new view               |
| CREATE  |  /life          | POST       |  Add new view to DB; redirect to index     |
| SHOW    |  /life/:id      | GET        |  Show more info about a specific view      |
| EDIT    |  /life/:id/edit | GET        |  Show a form for editing view              |
| UPDATE  |  /life/:id      | PUT        |  Updata a specific view; redirect to show  |
| Destroy | /life/:id       | DELETE     |  Delete a specific view; redirect to index |
>>>>>>> 373e9ed39feba82d7fd05871a9ffc971d054d1c4
