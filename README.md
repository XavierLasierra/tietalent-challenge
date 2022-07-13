# TieTalent challenge

Coding challenge by TieTalent. The app is deployed in https://tietalent-challenge.vercel.app/ with vercel.

## You can find in the app

- Next.js framework.
- Sample unit tests.
- Typescript.
- Functional components.
- Api fetch with Axios.
- Chart.js usage
- SASS.
- CSS Modules.
- Reusable components.
- Clean code following SOLID principles.

## To run the application

Rename `.env.example` file to `.env.local` and fill it with the correct data (API_BASE_URL=https://swapi.dev/api) and install the dependencies (`yarn`).

**`npm run dev`** or **`yarn dev`** to run the application locally (http://localhost:3000/)

**`npm test`** or **`yarn test`** to run the unit tests

**`npm run test:coverage`** or **`yarn test:coverage`** to run the unit tests collecting the code coverage

## Things that I would made differently if I had more time

- Use `styled-components` to have a more solid style structure.
- Adopt a Test Driven Development flow when developing to ensure better code quality.
- Have more unit tests and integration tests.
- Improve website accessibility.
- Better detail page.
- Create global state with useContext to store user configuration data. Create light/dark theme rendered depending on this data.
- Add git hooks (`husky`) to trigger actions as linting before commiting.
- Add github actions to run the tests on pull request to check if everythings is ok before merging.
- Create a figma beforehand to have a more clean design.
- Research more on next.js folder structure best practices. I'm sure I could find/think of a better way to structure the components differentiating the common components and the components that will only be used in a single page.
