<div align="center">

<h2>A tool to quickly mockout end points, setup delays and more...</h2>
<img alt="header" src="./header.png" />
<p>Mock APIs fast with real end points, no more mocked JSON files for your response.</p>
<p>Features: Hot reload on your API, UI to create, edit and delete end points, Chaos Engineering and more...</p>

[Read the Docs](https://mockit-docs.netlify.com/) | [Edit the Docs](https://github.com/boyney123/mockit-docs)

_If you find this tool useful, feel free to buy me a ☕ 👍 -> [Buy a drink](https://www.paypal.me/boyney123/5)_

</div>

<hr/>

[![Travis](https://img.shields.io/travis/boyney123/mockit/master.svg)](https://travis-ci.org/boyney123/mockit)
[![CodeCov](https://codecov.io/gh/boyney123/mockit/branch/master/graph/badge.svg?token=AoXW3EFgMP)](https://codecov.io/gh/boyney123/mockit)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6d5acca1-0959-4d92-a739-08f725fdc464/deploy-status)](https://app.netlify.com/sites/mockit-docs/deploys)
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

## The problem

When building applications you often need to interact with services. When the services are not ready to be consumed you have a few options:

1. Mock out the response with a JSON file
2. Create a mock service yourself
3. Use MockIt.

## This solution

This tool was designed to help developers quickly create end points for their applications. No need to create a server, just use docker and run this project locally. You can create, edit and manage routes to your API. Every change to the API will be reflected on the server and updated straight away.

This tool comes with a few features out the box:

- CORS
- Basic Authentictaion
- Chaos Monkey (Unleash a monkey to take down your end points)

More information about how it works, its features can be found on the docs.

[Read the docs and get started](https://mockit-docs.netlify.com/)

## Getting Started

```sh
git clone git@github.com:boyney123/mockit.git
```

Next go into `mockit` and run (You need to make sure Docker is running)

```sh
sh build-and-start.sh
```

_This will create all the docker containers required to run this application._

Once everything is up and running go to [http://localhost:5000](http://localhost:5000) to see MockIt.

If you want to know how to use MockIt please [checkout the instructions](https://mockit-docs.netlify.com/docs/getting-started/routes).

#### Permissions
_If you have any problems with permissions you might need to chmod the file_
```
chmod +x build-and-start.sh && ./build-and-start.sh
```

## Contributing

If you have any questions, features or issues please raise any issue or pull requests you like.

[spectrum-badge]: https://withspectrum.github.io/badge/badge.svg
[spectrum]: https://spectrum.chat/explore-tech
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://github.com/boyney123/react.explore-tech.org/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
