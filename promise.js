// program 1

const hobby = (myHobby)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
             const yourHobby = ['Gaming','Watching','Swimming','Reading']
             const find = yourHobby.find((item)=> item.toLowerCase() === myHobby.toLowerCase())
            if(find){
               resolve('Hobi kita sama') 
            } else {
                reject(new Error('Hobi tidak ada'))
            }
        }, 500)
    })
}
// hobby('games')
// .then((find)=>{
//     console.log(find);
// })
// .catch((error)=>{
//     console.log(error);
// })

// const getHobby = async ()=>{
//     try {
//         const find = await hobby('swimming')
//         console.log(find);
        
//     } catch (error) {
//         console.log(error);
//     }
// }
// getHobby()


//program 2

const kelipatanLima = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let result = ''
            const nilai = Math.floor(Math.random() *50);
            if(nilai % 5 === 0){
                result = `${nilai} merupakan kelipatan 5`
                resolve(result)
            }else{
                result = new Error(`${nilai} bukan kelipatan 5`)
                reject(result)
            }
        }, 3000)
    })

}

// kelipatanLima()
// .then((result)=>{
//     console.log(result);
// })
// .catch((error)=>{
//     console.log(error);
// })


const kelipatan = async()=>{
    try {
        const result = await kelipatanLima()
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
kelipatan()