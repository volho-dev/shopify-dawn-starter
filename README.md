## Tools
- Node v18.14.0
- Gulp - https://gulpjs.com/
- Shopify CLI - https://shopify.dev/themes/tools/cli
- Prettier - https://shopify.dev/themes/tools/liquid-prettier-plugin
  - Use `<!-- prettier-ignore -->` to ignore a node

## Onboarding
- Install [Shopify-CLI](https://shopify.dev/themes/tools/cli) if not already present on your machine; the project has been tested and works with CLI version 3.48.1
- Clone the repo to your local machine.
- Make sure you are running Node v18 or higher (use [nvm](https://github.com/nvm-sh/nvm) if you need to maintain various versions of Node.js on your system).
- If you use a `git` GUI app, you may need to set your default version of Node.js to 18, e.g. `nvm alias default 18.14.0`; the pre-commit `Prettier` script will fail if your `git` GUI is using an unsupported version of Node.
- Install dependencies: `npm install`
- Create a new file at your system USER folder (`/~`) called `.huskyrc`, and paste in the following contents:

```
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

- Create a file in the project's top directory called `config.js`; example below:

```
module.exports = {
  // switch between commented-out `shopify_url` values as needed
  shopify_url: "your_shopify_store_handle.myshopify.com",
  theme_editor_sync: true // set to true to have customizer changes persist
};
```

## Workflow
1. Branch off `master` for feature branch (ex `feature/XXX-11`)
2. Run `gulp` - Builds assets and also runs the Shopify CLI. May prompt you for login in your browser as needed.
3. Commit changes to branch, excluding any changes to files in the `.shopifyignore`
   - There may be certain situations where the files in the `.shopifyignore` do need to be edited. Check in with the Project Tech Lead or another developer if you are unsure.
4. Create PR for feature branch to `develop`
   - There may be certain situations where the PR should be made to some other branch. Check in with the Project Tech Lead or another developer if you are unsure.
5. When approved, the Project Tech Lead will merge to the relevant branch.
6. Before deploying to production, assets should be build with the `build` command, e.g. `npm run build`.
7. After a production deployment has been completed, merge the `master` branch into `develop`.


## Code style agreement
- Github Actions
  - https://github.com/Shopify/theme-check-action
  - https://github.com/Shopify/lighthouse-ci-action
