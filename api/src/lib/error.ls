export format-error = (error) ->
  error.stack or
  error.message or
  error
