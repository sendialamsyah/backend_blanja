fetch('https://jsonplaceholder.typicode.com/users')
.then(function(response) {
    response.json()  
} )
.then(data => {
    data.map(({name})=>{
        console.log(name)    
    })
})
.catch(error => console.log(error))