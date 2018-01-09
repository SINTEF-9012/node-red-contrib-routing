# node-red-contrib-routing
A Node-RED node to route incoming messages based on their topics.

It is inspired by [Ruby on Rails' routing](http://api.rubyonrails.org/classes/ActionDispatch/Routing.html) and [Express.js' routing](https://expressjs.com/en/guide/routing.html). It uses [rlite](https://github.com/chrisdavies/rlite) to match a message to a single route.

![](https://user-images.githubusercontent.com/45740/34722402-78ef86e2-f54f-11e7-8e56-5411777c80f7.png)

### Example

##### Routes

 * `iot/:sensor/humidity`
 * `iot/:sensor/temperature`
 * `traffic`
 
##### Incomming message

```json
{
    "topic": "iot/AJ08/humidity",
    "payload": "18"
}
```

#### Output

Will match the route `iot/:sensor/humidity` and the forwarded message will be :
```json
{
    "topic": "iot/AJ08/humidity",
    "payload": "18",
    "params": {
        "sensor": "AJ08"
    }
}
```
