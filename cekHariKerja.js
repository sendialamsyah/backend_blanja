const cekHariKerja = (day)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            const dataDay = ['senin', 'selasa', 'rabu','kamis','jumat']
            let cek = dataDay.find((item)=>{
                return item === day
            })
            if (cek){
                resolve(cek)
            } else {
                reject(new Error(`Hari ${day} bukan hari kerja`))
            }
        }, 3000)
    })
}

// cekHariKerja('minggu')
// .then((cek)=>{
//     console.log(`${cek} adalah hari kerja`);
// })
// .catch((error)=>{
//     console.log(error);
// })

const getHariKerja = async ()=>{
    try {
        const cek = await cekHariKerja('senin')
        console.log(`${cek} adalah hari kerja`);
        
    } catch (error) {
        console.log(error);
    }
}
getHariKerja()