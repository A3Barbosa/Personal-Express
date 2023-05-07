var theStar = document.getElementsByClassName("fa-star");
var trash = document.getElementsByClassName("fa-trash");

console.log('click')

// Array.from(theStar).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const thoughts = this.parentNode.parentNode.childNodes[3].innerText
//         const theStar = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('comments', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'thoughts': thoughts,
//             'theStar':theStar
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const thoughts = this.parentNode.parentNode.childNodes[3].innerText
        fetch('comments', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'thoughts': thoughts
          })
        }).then(function (response) {
          //window.location.reload()
        })
      });
});
