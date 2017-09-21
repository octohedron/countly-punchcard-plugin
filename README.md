# countly punchcard plugin

> Shows a punchcard-like event visualization, with day of the week and hour

Check out the [examples](./examples.md) to see how to log your events for displaying in the plugin.

After installation, it will show under the `Analytics` menu -> `Times of day`

To log an event and display it on the graph

```javascript
curl --request GET \
     --url "http://192.168.1.47/i?device_id=1234567890&app_key=6cc...05c&dow=0&hour=10"
```

Remember to change the IP address and your `app_key`
