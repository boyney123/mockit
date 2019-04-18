<div align="center">

<h2>MockIt: A tool to quickly create mocked APIs.</h2>
<p>Stop wasting time mocking APIs. MockIt gives you an interface to configure and create REAL mocked end points for your applications. Whilst you wait for APIS to be built use MockIt to talk to a real service.</>

[![Travis](https://img.shields.io/travis/boyney123/mockit/master.svg)](https://travis-ci.org/boyney123/mockit)
[![CodeCov](https://codecov.io/gh/boyney123/mockit/branch/master/graph/badge.svg?token=AoXW3EFgMP)](https://codecov.io/gh/boyney123/mockit)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6d5acca1-0959-4d92-a739-08f725fdc464/deploy-status)](https://app.netlify.com/sites/mockit/deploys)
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

<hr />

<img alt="header" src="./images/demo.gif" />
<h3>Features: Live Reload, Choas Engineering, Authentication, CORS and more...</h3>

[Read the Docs](https://mockit.netlify.com/) | [Edit the Docs](https://github.com/boyney123/mockit-docs)

</div>

<hr/>

# The problem

When building applications you often need to interact with services. When the services are not ready to be consumed you have a few options:

1. Mock out the response with a JSON file
2. Create a mock service yourself
3. Use MockIt.

# This solution

This tool was designed to help developers quickly create end points for their applications. No need to create a server, just use docker and run this project locally. You can create, edit and manage routes to your API. Every change to the API will be reflected on the server and updated straight away.

This tool comes with a few features out the box:

- CORS
- Basic Authentictaion
- Chaos Monkey (Unleash a monkey to take down your end points)

More information about how it works, its features can be found on the docs.

[Read the docs and get started](https://mockit.netlify.com/)

# Getting Started

_Make sure you have docker running_

```sh
git clone git@github.com:boyney123/mockit.git
```

```sh
cd mockit && sh build-and-start.sh
```

Once everything is up and running go to [http://localhost:5000](http://localhost:5000) to see MockIt.

For instructions on how to use MockIt please see the [documentation](https://mockit.netlify.com/docs/getting-started/routes).

## Permissions

_If you have any problems with permissions you might need to chmod the file_

```
chmod +x build-and-start.sh && ./build-and-start.sh
```

# Tools

- [nodemon - Listening for changes](https://github.com/remy/nodemon)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)

## Testing

- [jest](https://jestjs.io/)
- [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- [supertest](https://github.com/visionmedia/supertest)

# Contributing

If you have any questions, features or issues please raise any issue or pull requests you like.

[spectrum-badge]: https://withspectrum.github.io/badge/badge.svg
[spectrum]: https://spectrum.chat/explore-tech
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://github.com/boyney123/react.explore-tech.org/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com

# Donating

If you find this tool useful, feel free to buy me a ☕ 👍

[Buy a drink](https://www.paypal.me/boyney123/5)

# License

MIT.
