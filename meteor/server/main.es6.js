
Meteor.startup(() => {});

Accounts.onLogin(attempt => {
  if (!attempt.allowed) {
    return;
  }

  // We trigger a fetch for both (full login, or resuming session)
  // but that might change in the future.
  if (attempt.type === 'resume') {
    Server.fetchData(attempt.user._id);
  }
  else {
    Server.fetchData(attempt.user._id);
  }
});
