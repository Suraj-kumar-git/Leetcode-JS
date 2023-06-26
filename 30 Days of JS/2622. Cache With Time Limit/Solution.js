var TimeLimitedCache = function() {
  this.cache = new Map();
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
  const currentTime = Date.now();
  const expirationTime = currentTime + duration;

  if (this.cache.has(key)) {
    const { expiration } = this.cache.get(key);
    if (expiration > currentTime) {
      this.cache.set(key, { value, expiration: expirationTime });
      return true;
    }
  }

  this.cache.set(key, { value, expiration: expirationTime });
  return false;
};

TimeLimitedCache.prototype.get = function(key) {
  const currentTime = Date.now();

  if (this.cache.has(key)) {
    const { value, expiration } = this.cache.get(key);
    if (expiration > currentTime) {
      return value;
    }
  }

  return -1;
};

TimeLimitedCache.prototype.count = function() {
  const currentTime = Date.now();
  let count = 0;

  for (const { expiration } of this.cache.values()) {
    if (expiration > currentTime) {
      count++;
    }
  }

  return count;
};
