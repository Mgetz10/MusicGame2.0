console.log('me')
self.addEventListener('message', function (e) {
  console.log(e.data)
})