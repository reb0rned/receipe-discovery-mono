# api endpoints

## AUTH MODULE

### user create

#### @POST /api/user

### user login

#### @POST /api/auth/login {secure}

### jwt test route

#### @GET /api/auth/profile

### Find user by email

#### @GET /api/user/:email

## RECIPE HANDLING MODULE

### Get all recipes

#### @GET /api/recipes

### Create recipe

#### @POST /api/recipes/create (secure)

### Get one by id

#### @GET /api/recipes/2 (secure)

### Get all by user id

#### @GET api/recipes/user-recipes (secure)

### Update recipe

#### @PATCH /api/recipes/:id

### Delete recipe

#### @DELETE /api/recipes/:id
