## Pages

Pages should be in pages folder, nextjs automaticaly create the routing by the name of the folder, the index at the root of the pages folder is the default '/' route. Be carefull, all content in the folder other than the index will create subroute, ex: a 'example.js' file in login folder will create a route named /login/example. If you want to create a clean architecture of containers, use the corresponding folder instead of declaring them in the page sub directory.

## Helpers

Helpers files are to be used everywhere in the project tree, to ensure the DRY principle.

# api.js

All the helpers relative to api calls will be set here.

# constants.js

