function incrementCounter(userId) {
  return db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    // Handle null value
    const newCounter = currentCounter === null ? 1 : currentCounter + 1; 
    return newCounter;
  });
}

// Further improvement for race condition: atomic operation
//This still does not eliminate data loss or inconsistency during a temporary database outage but dramatically reduces that issue.
function incrementCounterAtomic(userId) {
  // Atomically increment the counter using increment()
  db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    if(currentCounter == null) {return 1}
    return {increment: 1};
  });
} 