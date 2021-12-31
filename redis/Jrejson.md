<div style="text-align: center;font-size: 40px;">RedisJson java client</div>


> [github](https://github.com/RedisJSON/JRedisJSON) \
> [maven search](https://search.maven.org/artifact/com.redislabs/jrejson/1.5.0/jar) \
> 
> 

### maven

```xml
<dependency>
  <groupId>com.redislabs</groupId>
  <artifactId>jrejson</artifactId>
  <version>1.5.0</version>
</dependency>
```

### gradle

```groovy
implementation 'com.redislabs:jrejson:1.5.0'
```

### java example

```jshelllanguage
import redis.clients.jedis.Jedis;
import com.redislabs.modules.rejson.JReJSON;

// First get a connection
JReJSON client = new JReJSON("localhost", 6379);

// Setting a Redis key name _foo_ to the string _"bar"_, and reading it back
client.set("foo", "bar");
String s0 = (String) client.get("foo");

// Omitting the path (usually) defaults to the root path, so the call above to
// `get()` and the following ones // are basically interchangeable
String s1 = (String) client.get("foo", new Path("."));
String s2 = (String) client.get("foo", Path.ROOT_PATH);

// Any Gson-able object can be set and updated
client.set("obj", new Object());             // just an empty object
client.set("obj", null, new Path(".zilch"));
Path p = new Path(".whatevs");
client.set("obj", true, p);
client.set("obj", 42, p);
client.del("obj", p);

```