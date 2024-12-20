function incrementCounter(userId) {
  return db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    return currentCounter + 1;
  });
}

// The above code might encounter an error if there is no counter in the database for a user.
// If the counter is not found, currentCounter will be null. When adding 1 to null, you get NaN (Not a Number).
// This leads to a silent failure, the counter value isn't updated.
// Additionally, this is a race condition. If multiple requests increment the counter simultaneously, they might overwrite each other's increments, potentially resulting in inaccurate counter values.