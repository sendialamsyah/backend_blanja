const getDataPost = (method, url, callback)=>{

    const ajax = new XMLHttpRequest()
    ajax.open(method, url)
    ajax.send()
    ajax.onload = function(){
        if(ajax.status === 200){
            const result = JSON.parse(ajax.responseText)
            callback(result)
        } else {
            console.log('ada error bro...');
        }
    }
}
// getDataPost()

getDataPost('GET', 'https://jsonplaceholder.typicode.com/posts', (result) =>{
    result.map(({title})=>{
        console.log(title);
    })
})