### About
This is a financial tracker website made with simple HTML, CSS, and Javascript connecting to Node.js Backend.
It's a SPA (Single Page Application), since it's running on barebone html and plain js,
it won't have same feature like modern framework such as React / Vue.
For example, if you do manually type the url and load it will return not found.
All the redirection is need to be done by interraction with the content.

### How to run this locally
1. This have config.js that manage the environment variable, so we can switch between environment
`/js/config.js`

2. if you want to use local data (other than the sign in & sign up), just change the value of `NODE_ENV` to something else then development

3. make sure port `8080` & `3000` are available

4. make sure to run the backend, otherwise you won't be able to sign in (instruction in backend Readme.md)

5. then run `npm run start` it will automatically open browser

### How to run against backend on cloud
1. you just need to change the `API_URL` the same as production one
```
API_URL: https://finance-tracker-backend-zbxuhg7gpq-as.a.run.app
```
2. This website is hosted in github pages under this domain
```
FRONTEND_URL: https://salismt.github.io/finance-tracker-frontend
```


### How to develop
1. make sure to commit and push your code in the main branch
```
git add -- .
git commit -m "add feature"
git push origin main
```
2. then build the dist build, this will create the distribution files
```
npm run predeploy
```
3. upload this to github-pages
```
npm run deploy
```
