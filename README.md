# nest-udp-adapter

[![NPM version][npm-image]][npm-url]

> A Nest UDP adapter based on @nestjs/websockets

## Installation

To begin using it, we first install the required dependency.

```bash
$ npm install --save @nestjs/websockets nest-udp-adapter 
```

## Getting started

Once the installation is complete, we can set up UDP adapter using `useWebSocketAdapter()` method:

```typescript
const app = await NestFactory.create(AppModule);
app.useWebSocketAdapter(new UdpAdapter(app, {
  type: 'udp4',
  port: 41234,
}));
```

The second argument of the `UdpAdapter` constructor is an `options` object. This object may consist of seven members:

<table>
  <tr>
    <td><code>type</code></td>
    <td>Either <code>udp4</code> or <code>udp6</code> (default: <code>udp4</code>)</td>
  </tr>
  <tr>
    <td><code>port</code></td>
    <td>Destination port</td>
  </tr>
  <tr>
    <td><code>address</code></td>
    <td>Destination host name or IP address</td>
  </tr>
  <tr>
    <td><code>socketOptions</code></td>
    <td>dgram.SocketOptions (read more 
      <a
        href="https://nodejs.org/api/dgram.html#dgramcreatesocketoptions-callback"
        rel="nofollow"
        target="blank"
        >here</a
      >)</td>
  </tr>
  <tr>
    <td><code>bindOptions</code></td>
    <td>dgram.BindOptions (read more 
      <a
        href="https://nodejs.org/api/dgram.html#socketbindoptions-callback"
        rel="nofollow"
        target="blank"
        >here</a
      >)</td>
  </tr>
  <tr>
    <td><code>multicastAddress</code></td>
    <td>The IP multicast group address</td>
  </tr>
  <tr>
    <td><code>multicastInterface</code></td>
    <td>The local IP address associated with a network interface</td>
  </tr>
</table>

## Example

A working example is available [here](https://github.com/fugle-dev/nest-udp-adapter/tree/master/example).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/nest-udp-adapter.svg
[npm-url]: https://npmjs.com/package/nest-udp-adapter
