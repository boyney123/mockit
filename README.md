<div align="center">

<h2>MockIt: A tool to quickly create mocked APIs.</h2>
<p>Stop wasting time mocking APIs. MockIt gives you an interface to configure and create REAL mocked end points for your applications. Whilst you wait for APIS to be built use MockIt to talk to a real service.</>

  <hr />

[![Travis](https://img.shields.io/travis/boyney123/mockit/master.svg)](https://travis-ci.org/boyney123/mockit)
[![CodeCov](https://codecov.io/gh/boyney123/mockit/branch/master/graph/badge.svg?token=AoXW3EFgMP)](https://codecov.io/gh/boyney123/mockit)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6d5acca1-0959-4d92-a739-08f725fdc464/deploy-status)](https://app.netlify.com/sites/mockit/deploys)
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors)

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

[Donate ☕](https://www.paypal.me/boyney123/5)

<hr />

<img alt="header" src="./images/demo.gif" />

  <h3>Features: Live Reload, Chaos Engineering, Authentication, CORS and more...</h3>

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
- Basic Authentication
- Chaos Monkey (Unleash a monkey to take down your end points)

More information about how it works, its features can be found on the docs.

[Read the docs and get started](https://mockit.netlify.com/)

# Getting Started

_Make sure you have docker running_

```sh
git clone git@github.com:boyney123/mockit.git
```

```sh
cd mockit && docker-compose up -d
```

Once everything is up and running go to [http://localhost:5000](http://localhost:5000) to see MockIt.

For instructions on how to use MockIt please see the [documentation](https://mockit.netlify.com/docs/getting-started/routes).

## Permissions

_If you have any problems with permissions you might need to chmod the file_

```
chmod +x build-and-start.sh && ./build-and-start.sh
```

# Viewing the dashboard, server and api

Once Docker is running you have three applications running on the machine.

1. The client: [http://localhost:5000](http://localhost:5000)
2. The client server: [http://localhost:4000](http://localhost:4000)
3. The MockIt API (this is the server that runs your API): [http://localhost:3000](http://localhost:3000)

If you want to view the dashboard to get started go to [http://localhost:5000](http://localhost:5000).

If you want to interact with your new API go to [http://localhost:3000](http://localhost:3000).

For example if you have a `/user` route setup, go to [http://localhost:3000/user](http://localhost:3000/user) to view the data.

# Tools

- [nodemon - Listening for changes](https://github.com/remy/nodemon)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)

## Documentation

- [Docusaurus](https://docusaurus.io/)

## Testing

- [jest](https://jestjs.io/)
- [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- [supertest](https://github.com/visionmedia/supertest)

# Contributing

If you have any questions, features or issues please raise any issue or pull requests you like.

[spectrum-badge]: https://withspectrum.github.io/badge/badge.svg
[spectrum]: https://spectrum.chat/explore-tech
[license-badge]: https://img.shields.io/github/license/boyney123/mockit.svg?color=yellow
[license]: https://github.com/boyney123/react.explore-tech.org/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/boyney123/mockit.svg?style=social
[github-watch]: https://github.com/boyney123/mockit/watchers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20mockit%20by%20%40boyney123%20https%3A%2F%2Fgithub.com%2Fboyney123%2Fmockit%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/boyney123/mockit.svg?style=social
[github-star-badge]: https://img.shields.io/github/stars/boyney123/mockit.svg?style=social
[github-star]: https://github.com/boyney123/mockit/stargazers

# Donating

If you find this tool useful, feel free to buy me a ☕ 👍

[Buy a drink](https://www.paypal.me/boyney123/5)

# License

MIT.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://medium.com/@boyney123"><img src="https://avatars1.githubusercontent.com/u/3268013?v=4" width="100px;" alt="David Boyne"/><br /><sub><b>David Boyne</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=boyney123" title="Code">💻</a> <a href="https://github.com/boyney123/mockit/commits?author=boyney123" title="Documentation">📖</a> <a href="#design-boyney123" title="Design">🎨</a> <a href="#ideas-boyney123" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-boyney123" title="Reviewed Pull Requests">👀</a> <a href="#tool-boyney123" title="Tools">🔧</a></td><td align="center"><a href="https://medium.com/@liran.tal"><img src="https://avatars1.githubusercontent.com/u/316371?v=4" width="100px;" alt="Liran Tal"/><br /><sub><b>Liran Tal</b></sub></a><br /><a href="#security-lirantal" title="Security">🛡️</a></td><td align="center"><a href="https://fb.com/RemoveU"><img src="https://avatars1.githubusercontent.com/u/19208123?v=4" width="100px;" alt="Hongarc"/><br /><sub><b>Hongarc</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=Hongarc" title="Documentation">📖</a></td><td align="center"><a href="https://hugo.pro"><img src="https://avatars3.githubusercontent.com/u/180032?v=4" width="100px;" alt="Hugo Locurcio"/><br /><sub><b>Hugo Locurcio</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=Calinou" title="Code">💻</a></td><td align="center"><a href="http://www.andrewroberthall.co.uk"><img src="https://avatars1.githubusercontent.com/u/724328?v=4" width="100px;" alt="Andrew Hall"/><br /><sub><b>Andrew Hall</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=FattusMannus" title="Documentation">📖</a></td><td align="center"><a href="http://grainger.xyz"><img src="https://avatars1.githubusercontent.com/u/1332395?v=4" width="100px;" alt="Peter Grainger"/><br /><sub><b>Peter Grainger</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=peterjgrainger" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/wohlben"><img src="https://avatars2.githubusercontent.com/u/9362553?v=4" width="100px;" alt="Ben"/><br /><sub><b>Ben</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=wohlben" title="Code">💻</a></td></tr><tr><td align="center"><a href="https://github.com/MCRayRay"><img src="https://avatars1.githubusercontent.com/u/2843957?v=4" width="100px;" alt="MCRayRay"/><br /><sub><b>MCRayRay</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=MCRayRay" title="Code">💻</a></td><td align="center"><a href="https://github.com/fbricon"><img src="https://avatars3.githubusercontent.com/u/148698?v=4" width="100px;" alt="Fred Bricon"/><br /><sub><b>Fred Bricon</b></sub></a><br /><a href="https://github.com/boyney123/mockit/commits?author=fbricon" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
