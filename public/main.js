var thumbUp = document.getElementsByClassName("fa-check");
var trash = document.getElementsByClassName("fa-trash");






Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('list', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'list': name,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
